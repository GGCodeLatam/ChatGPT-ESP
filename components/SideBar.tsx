"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";

function SideBar() {
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session && query(collection(db, 'users', session.user?.email!, 'chats'), orderBy("createdAt", "asc"))
    );

    console.log(chats)

    return <div className="p-2 flex flex-col h-screen min-w-[150px] ">
        <div className="flex-1">
            <div>
                {/* NewChat */}
                <NewChat />
                <div>
                    {/* ModelSelection */}
                </div>
                {chats?.docs.map(chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                ))}
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