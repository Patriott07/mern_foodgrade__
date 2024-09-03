'use client';

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import { FaTrash } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useParams } from 'next/navigation';
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const socket = io("http://localhost:5072", {
    reconnection: true,
    reconnectionAttempts: 5, // Jumlah percobaan koneksi ulang
    reconnectionDelay: 1000,  // Delay antara percobaan
});

type chat = {
    message: string,
    username: string,
    time: string,
    profileImage : string
}

type detail_room = {
    name: string,
    participants: number,
    imageUrl: string
}


export default function ManageFood() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<chat[]>([]);
    const [detailRoom, setDetailRoom] = useState<detail_room>({
        name: '',
        participants: 0,
        imageUrl: ''
    });

    const {authInfo} = useSelector((state : RootState) => state.user);


    const fetchInit = async () => {
        try {
            const res = await fetch(`http://localhost:5072/chats/${id}`);
            const data = await res.json();
            setChats(data.chats);



            const res2 = await fetch(`http://localhost:5072/group/${id}`);
            const data2 = await res2.json();
            setDetailRoom(data2._group);
            console.log(data2._group)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {


        const element: any = document.getElementById("box");
        element.scrollIntoView();
    }, [chats])

    useEffect(() => {
        socket.on('notification', (msg) => {
            console.log('Message from server:', msg);
            alert(msg);
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', (e) => {
            console.log('Disconnected from server', e);
        });

        fetchInit();

    }, []);

    useEffect(() => {
        socket.emit("join_room", id)
        return () => {
            // Cleanup ketika komponen unmount/ akan dijalankan ketika page berpindah / close
            // socket.emit("leave_room", id)
        }
    }, [id]);

    useEffect(() => {
        socket.on('new_message', (data: any) => {
            console.log({ data })
            setChats(prevChat => [...prevChat, data])
        });

    }, [socket])

    const handleSubmitChat = async (e: any) => {
        e.preventDefault();
        const inpt: any = document.getElementById('chat');
        inpt.value = '';
        try {
            const res = await fetch(`http://localhost:5072/chat/push`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room: id,
                    message,
                    userRef: authInfo._id,
                    username: authInfo.username,
                    profileImage : authInfo.profileImage
                })
            });

            const data = await res.json();

            console.log({ res, data });
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div className="relative md:w-[80%] bg-slate-900">
            {/* <h1>Groupchat page</h1> */}

            <div className="flex gap-4 items-center px-[10%] py-4 border-b border-white">
                <Link href="/dashboard/groupchat">
                    <IoArrowBackCircleSharp size={32} color="white" className="text-white hover:text-slate-500" />

                </Link>
                <div className="w-12 h-12 bg-start bg-cover rounded-full" style={{ backgroundImage: `url('${detailRoom.imageUrl}')` }} />
                <div className="flex-flex-col font-medium text-white">
                    <div className="text-[18px]">{detailRoom.name ?? ''}</div>
                    <div className="text-[14px]">{detailRoom.participants ?? '0'} people in this chats.</div>
                </div>
            </div>

            {/* container chats */}
            <div style={{ overflowY: 'auto' }}>
                <div className="flex mx-[10%] mt-6 flex-col mb-20">

                    {/* <div className="flex items-start justify-end gap-2.5 py-4">
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>

                    </div>
                    <div className="w-8 h-8 rounded-full bg-cover bg-center bg-[url('https://www.gptx.org/files/sharedassets/public/v/1/home-page/images/news-and-event-pages/stethoscope-with-blocks.jpg?dimension=pageimagefullwidth&w=1140')]" />

                </div> */}

                    {chats.length > 0 ? (
                        chats.map((prop) => (
                            <div className="flex items-start gap-2.5 py-4">
                                <div className="w-8 h-8 rounded-full bg-cover bg-center"  style={{backgroundImage : `url('${prop.profileImage}')`}} />
                                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{prop.username}</span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{prop.time}</span>
                                    </div>
                                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{prop.message}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-[20vh] flex items-center justify-center">
                            <div className="bg-white/10 px-4 py-2 text-sm font-medium text-white rounded-full">Lets start the chats</div>
                        </div>
                    )}

                </div>

                <div id="box" />
            </div>


            <form className="mx-[10%] fixed bottom-4 md:min-w-[55%]" onSubmit={handleSubmitChat}>
                <label className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg  bg-white/5 md:min-w-[80%] justify-center dark:bg-gray-700">

                    <button type="button" onClick={() => document.getElementById('box')?.scrollIntoView()} className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                        </svg> */}
                        <FaArrowAltCircleDown />
                        <span className="sr-only">Scroll down</span>
                    </button>
                    <button type="reset" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                        </svg> */}
                        <FaTrash />
                        <span className="sr-only">Reset</span>
                    </button>
                    <textarea id="chat" onChange={(e: any) => setMessage(e.target.value)} rows={1} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                    <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>

        </div>
    )
}
