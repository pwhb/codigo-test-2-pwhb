"use client";
import Link from "next/link";
import { useAuth } from "./AuthContext";

export default function Navbar()
{

    return <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
            <a className="normal-case font-semibold text-primary text-xl">Codigo State Management Test</a>
        </div>
        <div className="flex-none">
            <NavbarEnd />
        </div>
    </div>;
}
function NavbarEnd()
{
    const { loading, authenticated, user, logout } = useAuth();


    return !loading && <div className="dropdown dropdown-end">
        {authenticated && user.username ? (<>
            <span className="mr-5">
                Logged in as <span className="font-bold">{user.username}</span>
            </span>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span className="text-xl">{user.username[0]}</span>
                    </div>
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><button onClick={logout}>Logout</button></li>
            </ul>  </>) : (<Link href={"/login"} className="btn btn-primary">Login</Link>)}
    </div>;
}