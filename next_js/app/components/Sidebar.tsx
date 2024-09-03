"use client";

import Link from "next/link";
import React from "react";
import { IoFastFood } from "react-icons/io5";
import { FaDiceD6 } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { GiArcheryTarget } from "react-icons/gi";
import { RiFilePaper2Line } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { SiWechat } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { GiEntryDoor } from "react-icons/gi";

import Swal from "sweetalert2";
import { useDispatch, UseDispatch } from "react-redux";
import { logout } from '@/app/redux/slicers/userSlicer';


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Sidebar: React.FC = () => {

    const [locationTab, setLocationTab] = useState<string>("Dashboard");
    const router = useRouter();
    const dispacth = useDispatch();

    const handleIconClick = (name: string) => {
        setLocationTab(name);
    }

    const handleLogout = async (e: any) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "Dengan menekan ya. maka kamu akan keluar dari aplikasi Smart Healthy System",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Aku ingin keluar",
                cancelButtonText: "Tidak"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispacth(logout());
                    Swal.fire({
                        title: "Logouted!",
                        text: "You have been logout.",
                        icon: "success"
                    }).then(() => router.push('/login'));
                }
            });
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
        } catch (error: any) {
            Swal.fire('Whoops', error, 'error');
        }
    }

    return (
        <aside className="flex">
            <div className="flex border-r mr-2 md:mr-0 border-slate-800/20 flex-col items-center w-16 min-h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
                <Link onClick={() => handleIconClick("Dashboard")} href="/dashboard" className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                    {locationTab == "Dashboard"
                        ? <IoHome size={24} color="#4CFD7D" />
                        : <IoHome size={24} color="#1e293b" />
                    }
                </Link>

                <Link onClick={() => handleIconClick("Foods")} href="/dashboard/foods">
                    {locationTab == "Foods"
                        ? <IoFastFood size={24} color="#4CFD7D" />
                        : <IoFastFood size={24} color="#1e293b" />
                    }

                </Link>

                <Link onClick={() => handleIconClick("Activity")} href="/dashboard/activities">
                    {locationTab == "Activity"
                        ? <FaRunning size={24} color="#4CFD7D" />
                        : <FaRunning size={24} color="#1e293b" />
                    }
                </Link>

                <Link onClick={() => handleIconClick("Contents")} href="/dashboard/educations">
                    {locationTab == "Contents"
                        ? <MdCastForEducation size={24} color="#4CFD7D" />
                        : <MdCastForEducation size={24} color="#1e293b" />
                    }

                </Link>

                <Link onClick={() => handleIconClick("Targets")} href="/dashboard/targets">
                    {locationTab == "Targets"
                        ? <GiArcheryTarget size={24} color="#4CFD7D" />
                        : <GiArcheryTarget size={24} color="#1e293b" />
                    }

                </Link>

                <Link onClick={() => handleIconClick("Recipes")} href="/dashboard/recipes">
                    {locationTab == "Recipes"
                        ? <RiFilePaper2Line size={24} color="#4CFD7D" />
                        : <RiFilePaper2Line size={24} color="#1e293b" />
                    }
                </Link>

                <Link onClick={() => handleIconClick("Chats")} href="/dashboard/groupchat">
                    {locationTab == "Chats"
                        ? <SiWechat size={24} color="#4CFD7D" />
                        : <SiWechat size={24} color="#1e293b" />
                    }
                </Link>


                <Link onClick={() => handleIconClick("Settings")} href="/dashboard/settings">
                    {locationTab == "Settings"
                        ? <IoSettingsSharp size={24} color="#4CFD7D" />
                        : <IoSettingsSharp size={24} color="#1e293b" />
                    }
                </Link>

                <a title="tombol keluar" href="/dashboard/Logout" onClick={handleLogout}>
                    <GiEntryDoor size={24} color="#FD5959" />
                </a>
            </div>

            <div className="min-h-screen hidden lg:block py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="px-5 text-lg font-semibold text-gray-800 dark:text-white">| {locationTab}</h2>
                <div style={{ overflowY: 'auto' }} className="mt-12 h-[65vh]">
                    <div className="flex flex-col gap-2 px-5">
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                        <Link href={"#"} className="flex hover:bg-slate-800/10 p-2 group rounded-md gap-2 items-center text-sm font-medium text-slate-800">
                            <FaDiceD6 size={18} className="text-slate-800" />
                            <p>Home</p>
                        </Link>
                    </div>

                </div>
            </div>
        </aside>
    )
}

export default Sidebar;