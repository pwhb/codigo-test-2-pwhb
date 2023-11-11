type Team = {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
    player_count: number;
};

export type CreatedTeam = {
    id?: number;
    name: string;
    player_count: number;
    region: string;
    country: string;
    players: number[];
};


export default Team;