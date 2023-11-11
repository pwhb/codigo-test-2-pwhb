import { JoinTeamModal, LeaveTeamModal } from "./Modal";
import PlayerCard from "./PlayerCard";
import { useStore } from "./StoreContext";

export default function PlayerTab()
{
    const { load, loading, players } = useStore();
    return <>

        <JoinTeamModal />
        <LeaveTeamModal />
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {players.map((player: any, idx: number) => (
                <PlayerCard player={player} key={player.id} isLast={idx === players.length - 1} />
            ))}
        </ul>


        <div className='mt-10'>
            {loading ? <span className="loading loading-dots loading-lg"></span> :
                <button className="btn btn-ghost btn-xs" onClick={load}>Load More</button>
            }
        </div>
    </>;
}