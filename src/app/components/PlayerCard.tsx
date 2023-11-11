import { useEffect, useRef, useState } from "react";
import Player from "../lib/types/player";
import { JoinButton, LeaveButton } from "./Modal";
import { useStore } from "./StoreContext";


export default function PlayerCard({ player, isLast }: { player: Player; key: string; isLast?: boolean; })
{
    const ref = useRef<HTMLDivElement>(null);
    const { teams } = useStore();

    // turn off auto scroll
    // useEffect(() =>
    // {


    //     if (isLast)
    //     {
    //         ref.current?.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, []);
    return <div className="card w-72 bg-base-100 shadow-xl" key={player.id} ref={ref}>
        <div className="card-body">
            <p>{player.first_name} {player.last_name}</p>
            <p>Team: {teams && teams[teams.findIndex((v: any) => v.players.includes(player.id))]?.name}</p>
            <div className="flex flex-row gap-2">
                <JoinButton player={player} />

                {teams.findIndex((v: any) => v.players.includes(player.id)) !== -1 && <LeaveButton player={player} />}
            </div>
        </div>
    </div>;
}