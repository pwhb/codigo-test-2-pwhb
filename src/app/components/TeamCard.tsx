import { useEffect, useRef } from "react";
import Team, { CreatedTeam } from "../lib/types/team";
import { DeleteButton, UpdateButton } from "./Modal";


export default function TeamCard({ team, isLast }: { team: CreatedTeam; isLast?: boolean; })
{
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        if (isLast)
        {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return <div className="card w-72 bg-base-100 shadow-xl" key={team.id} ref={ref}>
        <div className="card-body">
            <p>{team.name}</p>
            <p>Player Count: {team.players.length}</p>
            <div className="flex flex-row gap-2">
                <UpdateButton team={team} />
                <DeleteButton team={team} />
            </div>
        </div>
    </div>;
}