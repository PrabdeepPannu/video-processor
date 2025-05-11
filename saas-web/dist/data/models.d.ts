export type GameModel = {
    id: number;
    name: string;
    date: Date;
    venue_id: number;
    team1_id: number;
    team2_id: number;
};
export type TeamModel = {
    id: number;
    name: string;
    league: string;
};
export type PlayerModel = {
    id: number;
    name: string;
    jersey_number: number;
    position: string;
};
export type VenueModel = {
    id: number;
    name: string;
    location: string;
    capacity: number;
};
