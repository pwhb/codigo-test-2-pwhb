"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType
{
    user: { username?: string; };
    authenticated: boolean;
    loading: boolean;
    login: (username: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () =>
{
    const Auth = React.useContext(AuthContext);
    if (!Auth)
    {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return Auth;
};

const AuthProvider = ({ children }: { children: React.ReactNode; }) =>
{
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const login = (username: string) =>
    {
        const user = { username };
        setUser(user);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
    };

    const logout = () =>
    {
        setUser({});
        setAuthenticated(true);
    };

    useEffect(() =>
    {
        const userJSONString = localStorage.getItem("user");
        if (userJSONString)
        {
            const userJSON = JSON.parse(userJSONString);
            if (userJSON.username)
            {
                setUser(userJSON);
                setAuthenticated(true);
            }
        }
        setLoading(false);
    }, []);



    return (
        <AuthContext.Provider value={{ user, loading, authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;