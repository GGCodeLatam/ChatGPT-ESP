"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";

function SideBar() {
    const { data: session } = useSession();
    return <div className="p-2 flex flex-col h-screen ">
        <div className="flex-1">
            <div>
                {/* NewChat */}
                <NewChat />
                <div>
                    {/* ModelSelection */}
                </div>
                {/* Map through the ChatRows */}
            </div>
        </div>
        {session && (
            <>
                <img src={session.user?.image!} alt="Foto de perfil"
                    className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-4" />
                <button
                className="border-gray-700 border chatRow"
                onClick={() => signOut()}>Cerrar sesión</button>
            </>
        )}
    </div>;

}

export default SideBar