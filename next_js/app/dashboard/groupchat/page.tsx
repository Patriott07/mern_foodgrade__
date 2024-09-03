'use client';

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import { FaTrash } from "react-icons/fa6";
import { useParams } from 'next/navigation';
import { setgroups } from "process";
import Link from "next/link";

const socket = io("http://localhost:5072", {
    reconnection: true,
    reconnectionAttempts: 5, // Jumlah percobaan koneksi ulang
    reconnectionDelay: 1000,  // Delay antara percobaan
});

type groups = {
    _id : string,
    name: string,
    participants: number,
    description: string,
    imageUrl: string,
    last_message: string
}

export default function ManageFood() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const [message, setMessage] = useState("");
    const [groups, setGroups] = useState<groups[]>([]);

    const fetchInit = async () => {
        try {
            const res = await fetch(`http://localhost:5072/groups`);
            const data = await res.json();

            setGroups(data.groups);
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', (e) => {
            console.log('Disconnected from server', e);
        });

        fetchInit();

    }, []);

    useEffect(() => {
        socket.on('new_group', (data) => {
            setGroups((prevGroup) => [...prevGroup, data]);
        });

        socket.on('new_message_for_group', (data) => {
            console.log('oke')
            fetchInit();
        })

        return () => {
            // Cleanup ketika komponen unmount/ akan dijalankan ketika page berpindah / close
            // socket.emit("leave_room", id)
        }
    }, [socket]);

    return (
        <div className="relative md:w-[80%] md:px-[10%] pt-40 bg-slate-900">
            {/* <h1>Groupchat page</h1> */}
            {groups.length > 0 ? (
                <div className="font-bold text-[24px] text-white">Find The Groups. Start chat</div>
            ) : null}
            {/* container groups */}
            <div className="flex mt-6 flex-col mb-20 gap-4">


                {groups.length > 0 ? (
                    groups.map((prop) => (
                        <Link href={`/dashboard/groupchat/${prop._id}`} className="rounded-md text-white hover:translate-y-[-8px] duration-200 hover:pointer-cursor bg-white/10 px-4 py-4 items-center justify-start flex gap-3">
                            <div className="w-fit p-1">
                                <div className="w-12 h-12 bg-center bg-cover rounded-full" style={{backgroundImage : `url('${prop.imageUrl}')`}} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[20px] font-medium">{prop.name}</p>
                                <p className="text-sm">{prop.last_message ?? 'No one start the chat.'}</p>
                            </div>
                            <div className="w-fit text-[14px] ms-auto">{prop.participants} people here.</div>
                        </Link>
                    ))
                ) : (
                    <div className="h-[20vh] flex items-center justify-center">
                        <div className="bg-white/10 px-4 py-2 text-sm font-medium text-white rounded-full">Its Groups Is Empty. Contact the Doctor to make platform chat</div>
                    </div>
                )}

            </div>



        </div>
    )
}
