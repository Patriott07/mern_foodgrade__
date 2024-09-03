"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '@/app/redux/store';
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import QRCodeWithImage from "@/app/components/MyQrGenerate";
import Swal from 'sweetalert2';

import Cryptr from 'cryptr';
import { logout } from "@/app/redux/slicers/userSlicer";
const cryptr = new Cryptr('myTotallySecretKey');

import { IoIosCloseCircle } from "react-icons/io";

const SettingAccount = () => {

    const { authInfo } = useSelector((state: RootState) => state.user);

    const router = useRouter();
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<number>(authInfo.age);
    const [isErr, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showQr, setShowQr] = useState<boolean>(false);
    const [daily_activity, setDailyAct] = useState<string>("");
    // const [detail]

    const jsonString = cryptr.encrypt(authInfo.email);
    console.log({ jsonString, decrypt: cryptr.decrypt(jsonString) });
    const dispacth = useDispatch();

    useEffect(() => {
        console.log({ authInfo });
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let input = JSON.stringify({
            username: e.target[0].value,
            weight: e.target[2].value,
            height: e.target[3].value,
            daily_activity: e.target[4].value,
            gender: e.target[5].value,
            age: e.target[7].value,
        });

        console.log({ e, input });

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/user/update`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'token': authInfo._id
                },
                body: input
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            Swal.fire("Success", data.message, 'success').
                then(() => {
                    dispacth(logout());
                    router.push('/login');
                });

        } catch (error: any) {
            console.log({ error })
            // Swal.fire("Whoops!", error, "error");
        }
    }

    return (
        <div className="flex gap-8 items-center mb-8" style={{ overflowX: 'auto' }}>
            <div className="left flex flex-col gap-6">
                <p className="text-[24px] font-medium">Your Account Information</p>

                <div className="">
                    <QRCodeWithImage
                        value={jsonString}
                        imageUrl={"https://gitlab.ow2.org/RocketChat/RC4Community/-/raw/d7c98d2eea15100b58adc3a209224526e59fb232/app/public/favicon.ico"} // Ganti dengan URL gambar kamu
                        size={256}
                    />
                </div>
            </div>

            <form className="right" onSubmit={handleSubmit}>

                <div className="relative mb-6 w-[140px] h-[140px] rounded-full  bg-cover bg-center border" style={{ backgroundImage: `url('${authInfo ? authInfo.profileImage : ''}')` }}>

                </div>


                <div className="mb-3 flex gap-4">
                    <div className="">
                        <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Nama pengguna</label>
                        <input defaultValue={authInfo.username} type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Masukan nama anda.." />
                    </div>
                    <div className="">
                        <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Alamat Email</label>
                        <input defaultValue={authInfo.email} type="email" disabled id="success" className="bg-gray-600/10 md:min-w-[300px]  border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Masukan nama anda.." />
                    </div>
                </div>


                <div className="mb-3 flex gap-4">
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Weight</label>
                        <input defaultValue={authInfo.weight} type="number" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Masukan Berat Badan" />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Height</label>
                        <input defaultValue={authInfo.height} type="number" id="success" className=" md:min-w-[300px] bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Masukan Tinggi Badan dalam Cm" />
                    </div>
                </div>

                <select id="countries" required onChange={(e) => setDailyAct(e.target.value)} className="bg-gray-50 border mt-4 max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-4 ">
                    <option value={authInfo.daily_activity} selected>{selectText(authInfo.daily_activity)}</option>
                    <option value="level1">Minim aktifitas</option>
                    <option value="level2">Aktifitas ringan, olahraga ringan</option>
                    <option value="level3">Aktifitas sedang, olahraga sedang</option>
                    <option value="level4">Aktifitas berat, olahraga berat</option>
                    <option value="level5">Aktivitas sangat berat</option>
                </select>

                <div className="flex gap-4">
                    <select id="countries" onChange={(e) => setGender(e.target.value)} className="bg-gray-50 border max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                        <option value={authInfo.gender} selected>{authInfo.gender == 'lakilaki' ? 'Laki - Laki' : 'Perempuan'}</option>
                        <option value="lakilaki">Laki - Laki</option>
                        <option value="perempuan">Perempuan</option>
                    </select>

                    <div className="text-xs">
                        <div className="relative flex items-center max-w-[8rem]">
                            <button onClick={() => setAge(age - 1)} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                                umur
                            </button>
                            <input type="number" min={1} defaultValue={age} id="quantity-input" className="md:min-w-[100px] bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Your age" />
                            <button onClick={() => setAge(age + 1)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                                umur
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" className="mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Perbarui Profile
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>

                    <button onClick={() => router.push('/dashboard')} type="button" className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                        Kembali
                        <IoIosCloseCircle size={18} className="ms-2.5" />
                    </button>

                </div>
            </form>
        </div>
    )
}


function selectText(val: string) {
    let text;
    if (val == 'level1') text = "Minim aktifitas";
    if (val == 'level2') text = "Aktifitas ringan, olahraga ringan";
    if (val == 'level3') text = "Aktifitas sedang, olahraga sedang";
    if (val == 'level4') text = "Aktifitas berat, olahraga berat";
    if (val == 'level5') text = "Aktivitas sangat berat";

    return text;
}

export default SettingAccount;

