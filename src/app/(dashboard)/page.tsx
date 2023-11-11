'use client';
import { useEffect, useState } from 'react';
import { baseUrl, per_page } from '../lib/consts/api';
import { useStore } from '../components/StoreContext';
import PlayerCard from '../components/PlayerCard';
import PlayerTab from '../components/PlayerTab';
import TeamTab from '../components/TeamTab';

enum Tab
{
  players,
  teams
}

export default function Page()
{
  const [tab, setTab] = useState<Tab>(Tab.players);
  const { playerCount, teamCount } = useStore();
  return (

    <main className="flex flex-col items-center justify-between p-10">
      <div className="tabs">
        <button className={tab === Tab.players ? "tab tab-bordered tab-active" : "tab tab-bordered"}
          onClick={() => setTab(Tab.players)}>Players ({playerCount})</button>
        <button className={tab === Tab.teams ? "tab tab-bordered tab-active" : "tab tab-bordered"} onClick={() => setTab(Tab.teams)}>Teams ({teamCount})</button>
      </div>

      {tab === Tab.players && <PlayerTab />}
      {tab === Tab.teams && <TeamTab />}

    </main>

  );
}



