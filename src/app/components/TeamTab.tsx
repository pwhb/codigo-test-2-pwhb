import { useState } from "react";
import { CreatedTeam } from "../lib/types/team";
import { CreateButton, CreateModal, DeleteModal, UpdateModal } from "./Modal";
import { useStore } from "./StoreContext";
import TeamCard from "./TeamCard";


export default function TeamTab()
{
    const { teams } = useStore();
    return <>
        <div className="my-10">
            <CreateButton />
        </div>
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {teams.map((team: any, idx: number) => (
                <TeamCard team={team} key={team.id} isLast={idx === teams.length - 1} />
            ))}
        </ul>

        <CreateModal />
        <UpdateModal />
        <DeleteModal />
    </>;
};