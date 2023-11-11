"use client";
import React, { createContext, useEffect, useState } from "react";
import { baseUrl, per_page } from "../lib/consts/api";
import Player from "../lib/types/player";
import { CreatedTeam } from "../lib/types/team";


type ErrorMessageType = {
    name: string;
    region: string;
    country: string;
};
interface StoreContextType
{
    players: Player[];
    teams: any[];
    load: () => Promise<void>;
    loading: boolean;
    playerCount: number;
    teamCount: number;
    teamForm?: CreatedTeam;
    setTeamForm: (team: CreatedTeam) => void;
    addTeam: () => boolean;
    updateTeam: () => boolean;
    removeTeam: () => void;
    joinTeam: (teamId: number) => void;
    errorMessage: ErrorMessageType;
    setErrorMessage: (message: ErrorMessageType) => void;
    selectedPlayer?: number;
    setSelectedPlayer: (teamId: number) => void;
}

async function fetchPlayers(page = 1)
{
    const res = await fetch(`${baseUrl}/players?per_page=${per_page}&page=${page}`);
    const data = await res.json();
    return data;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () =>
{
    const store = React.useContext(StoreContext);
    if (!store)
    {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return store;
};

export const initialTeamForm: CreatedTeam = {
    name: "",
    player_count: 0,
    region: "",
    country: "",
    players: []
};

const StoreProvider = ({ children }: { children: React.ReactNode; }) =>
{
    const [players, setPlayers] = useState<Player[]>([]);
    const [teams, setTeams] = useState<CreatedTeam[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [teamForm, setTeamForm] = useState<CreatedTeam>(initialTeamForm);
    const [errorMessage, setErrorMessage] = useState({ name: "", region: "", country: "" });
    const [selectedPlayer, setSelectedPlayer] = useState<number>();

    useEffect(() =>
    {
        load();
        const teamsJSONString = localStorage.getItem("teams");
        if (teamsJSONString)
        {
            const teamsJSON = JSON.parse(teamsJSONString);
            if (teamsJSON)
            {
                setTeams(teamsJSON);
            }
        }
    }, []);

    async function load()
    {
        setLoading(true);
        const data = await fetchPlayers(page);
        setPage(data.meta.next_page);
        const updated = [...players, ...data.data] as Player[];
        setPlayers(updated);

        // originally used team property of each player

        // const teams = updated.reduce((prev: any, cur: any) =>
        // {
        //     for (const id in prev)
        //     {
        //         if (prev[id].id === cur.team.id)
        //         {
        //             prev[id].player_count++;
        //             prev[id].players.push(cur);
        //             return prev;
        //         }
        //     }
        //     return [...prev, {
        //         ...cur.team,
        //         player_count: 1,
        //         players: [cur]
        //     }];
        // }, []);

        // console.log("teams", teams);

        // setTeams(teams);
        setLoading(false);
    }


    function addTeam()
    {
        if (teams.some(v => v.name === teamForm.name))
        {
            setErrorMessage({
                ...errorMessage,
                name: "Team name is already taken."
            });
            return false;
        }

        if (!teamForm.name || !teamForm.region || !teamForm.country)
        {
            setErrorMessage({
                name: teamForm.name ? "" : "Name is required",
                region: teamForm.region ? "" : "Region is required", country: teamForm.country ? "" : "Country is required"
            });
            return false;
        }

        const update = [...teams, teamForm] as CreatedTeam[];
        setLocalStorage(update);
        setTeamForm(initialTeamForm);
        return true;
    }

    function updateTeam()
    {
        if (teams.some(v => v.name === teamForm.name))
        {
            setErrorMessage({
                ...errorMessage,
                name: "Team name is already taken."
            });
            return false;
        }
        if (!teamForm.name || !teamForm.region || !teamForm.country)
        {
            setErrorMessage({
                name: teamForm.name ? "" : "Name is required",
                region: teamForm.region ? "" : "Region is required", country: teamForm.country ? "" : "Country is required"
            });
            return false;
        }
        const update = [...teams];
        const index = update.findIndex((t) => t.id === teamForm.id);
        update[index] = teamForm;
        setLocalStorage(update);
        setTeamForm(initialTeamForm);
        return true;
    }

    function removeTeam()
    {
        const update = teams.filter((t) => t.id !== teamForm.id) as CreatedTeam[];
        setLocalStorage(update);
    }

    function joinTeam(teamId: number)
    {
        const update = [...teams];

        const oldTeamIdx = update.findIndex((t) => t.players.includes(selectedPlayer!));

        console.log("oldTeamIdx", oldTeamIdx);

        if (oldTeamIdx !== -1)
        {
            update[oldTeamIdx]["players"] = update[oldTeamIdx]["players"].filter((p) => p !== selectedPlayer);
            console.log(update[oldTeamIdx]);
            ;
        }
        const newTeamIdx = update.findIndex((t) => t.id === teamId);
        if (!update[newTeamIdx]["players"].includes(selectedPlayer!))
        {
            update[newTeamIdx]["players"].push(selectedPlayer!);
        }

        setLocalStorage(update);
        setTeamForm(initialTeamForm);
    }

    function setLocalStorage(update: CreatedTeam[])
    {
        setTeams(update);
        localStorage.setItem("teams", JSON.stringify(update));
    }



    return (
        <StoreContext.Provider value={{
            players, teams, load, loading, playerCount: players.length, teamCount: teams.length, setTeamForm, teamForm, addTeam, updateTeam, removeTeam, errorMessage, setErrorMessage, setSelectedPlayer, joinTeam
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;