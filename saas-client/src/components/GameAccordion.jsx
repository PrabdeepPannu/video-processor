import React, { useState } from 'react';
import { Card as BCard, Button as BButton, Collapse, Spinner } from 'react-bootstrap';
import Card from './Card';
import Video from './Video';
import Alert from './Alert';
import { apiGet } from '../utils/api';

export default function GameAccordion({ game }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [venue, setVenue] = useState(null);
  const [players, setPlayers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [team1Expanded, setTeam1Expanded] = useState(false);
  const [team2Expanded, setTeam2Expanded] = useState(false);

  const toggleTeam = (team) => {
    if (team === 1) {
      setTeam1Expanded(!team1Expanded);
      setTeam2Expanded(false);
    } else {
      setTeam2Expanded(!team2Expanded);
      setTeam1Expanded(false);
    }
  };

  const toggle = async () => {
    if (open) return setOpen(false);

    setLoading(true);
    setError(null);

    try {
      const v = await apiGet('web', `/venues/${game.venue_id}`);
      const team1 = await apiGet('web', `/teams/${game.team1_id}`);
      const team2 = await apiGet('web', `/teams/${game.team2_id}`);

      const roster1 = await apiGet('web', `/players?team=${game.team1_id}`);
      const roster2 = await apiGet('web', `/players?team=${game.team2_id}`);
      const vids = await apiGet('web', `/videos/game/${game.id}`);

      setVenue(v);
      setPlayers([...roster1, ...roster2]);
      setVideos(vids);
      setTeam1Name(team1.name);
      setTeam2Name(team2.name);
    } catch (err) {
      setError(`Failed to load details: ${err.message || err}`);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <BCard className="mb-2">
      <BCard.Header>
        <BButton variant="link" onClick={toggle} aria-expanded={open}>
          {game.name}
        </BButton>
      </BCard.Header>

      <Collapse in={open}>
        <div className="p-3">
          {loading && <Spinner animation="border" />}
          {error && <Alert message={error} variant="danger" />}

          {venue && (
            <Card title="Venue" content={`${venue.name} — ${venue.location}, ${venue.capacity || ''}`} />
          )}

          {players.length > 0 && (
            <div className="mb-3">
              <h5>Teams & Players</h5>

              {team1Name && (
                <BCard className="mb-2">
                  <BCard.Header>
                    <BButton variant="link" onClick={() => toggleTeam(1)} aria-expanded={team1Expanded}>
                      {team1Name}
                    </BButton>
                  </BCard.Header>
                  <Collapse in={team1Expanded}>
                    <div>
                      <BCard.Body>
                        <ul className="list-unstyled">
                          {players
                            .filter((p) => p.team_id === game.team1_id)
                            .map((p) => (
                              <li key={p.id}>
                                #{p.jerseyNumber} - {p.name} ({p.position})
                              </li>
                            ))}
                        </ul>
                      </BCard.Body>
                    </div>
                  </Collapse>
                </BCard>
              )}

              {team2Name && (
                <BCard>
                  <BCard.Header>
                    <BButton variant="link" onClick={() => toggleTeam(2)} aria-expanded={team2Expanded}>
                      {team2Name}
                    </BButton>
                  </BCard.Header>
                  <Collapse in={team2Expanded}>
                    <div>
                      <BCard.Body>
                        <ul className="list-unstyled">
                          {players
                            .filter((p) => p.team_id === game.team2_id)
                            .map((p) => (
                              <li key={p.id}>
                                #{p.jerseyNumber} - {p.name} ({p.position})
                              </li>
                            ))}
                        </ul>
                      </BCard.Body>
                    </div>
                  </Collapse>
                </BCard>
              )}
            </div>
          )}

          {videos.length > 0 && (
            <div>
              <h5>Videos</h5>
              {videos.map((v) => (
                <VideoCard key={v.id} video={v} gameId={game.id} />
              ))}
            </div>
          )}
        </div>
      </Collapse>
    </BCard>
  );
}

function VideoCard({ video, gameId }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  const process = async () => {
    setBusy(true);
    setErr(null);
    try {
      const data = await apiGet('video', `/videos/${video.id}/${video.url}/download`);
      const playersWithNames = await fetchPlayerNames(data.players);
      setResult(playersWithNames || []);
    } catch (e) {
      setErr(e.message || 'Error processing video');
    } finally {
      setBusy(false);
    }
  };

  const fetchPlayerNames = async (players) => {
    const playerNames = await Promise.all(
      players.map(async (p) => {
        const playerData = await apiGet('web', `/players/jersey/${p.jersey}`);
        return { ...p, name: playerData.name || 'Unknown' };
      })
    );
    return playerNames;
  };

  return (
    <div className="mb-4">
      <Card title={video.description} />
      <Video srcOrPath={video.url} />

      <BButton onClick={process} disabled={busy}>
        {busy ? 'Processing…' : 'Process & Show Players'}
      </BButton>

      {err && <Alert message={err} variant="danger" />}

      {result && result.length > 0 && (
        <div className="mt-2">
          <h6>Detected Players:</h6>
          {result.map((p) => (
            <Card
              key={p.jersey}
              title={`#${p.jersey} - ${p.name}`}
              content={
                <div>
                  <p><strong>Avg Size:</strong> {p.stats.avg_size}</p>
                  <p><strong>Duration:</strong> {p.stats.duration}s</p>
                  <p><strong>In Point:</strong> {p.stats.in_point}</p>
                  <p><strong>Max Size:</strong> {p.stats.max_size}</p>
                  <p><strong>Out Point:</strong> {p.stats.out_point}</p>
                  <p><strong>Prominence Score:</strong> {p.stats.prominence_score}</p>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
