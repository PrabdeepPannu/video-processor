// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Alert from '../components/Alert';
import GameAccordion from '../components/GameAccordion';
import { apiGet, API_TYPES } from '../utils/api';

// Home page: list games in an accordion
export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(API_TYPES.WEB, '/games');
        if (!Array.isArray(data)) throw new Error('Bad payload');
        setGames(data);
      } catch (e) {
        setError(e.message || 'Could not fetch games');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Game Browser</h2>
      {error && <Alert message={error} variant="danger" />}
      {loading && (
        <div className="text-center my-4">
          {/* simple loader */}
          <Spinner animation="border" />
        </div>
      )}
      {!loading && games.length === 0 && !error && (
        <Alert message="No games to show" variant="info" />
      )}

      <Accordion>
        {games.map((g, i) => (
          <GameAccordion key={g.id} eventKey={String(i)} game={g} />
        ))}
      </Accordion>
    </div>
  );
}
