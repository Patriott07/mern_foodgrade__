'use client';
import { useEffect, useState } from "react";

import React from "react";

import manpic from '../../../image/CittàStanding.png';
import womanpic from '../../../image/WomenPowerStanding.png';
import { useParams } from "next/navigation";

import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const UserInfo: React.FC = () => {

    const { id } = useParams();

    const router = useRouter();
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<number>(17);
    const [isErr, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [daily_activity, setDailyAct] = useState<string>("");

    const image: string[] = [
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(7).png?alt=media&token=bea65a38-dfe0-4959-a5ea-f5f576737a3e",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(9).png?alt=media&token=107f9c95-dd8d-4dbb-9721-7935cc91f9d5",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(1).png?alt=media&token=ddd0ee5b-15d1-41fd-b9d2-ce9aec7cf280",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(2).png?alt=media&token=2ba5413a-cb1f-4eb5-8aeb-ec1d156bbd9b",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(3).png?alt=media&token=b546640b-86ff-4681-90f4-3111245e8bd1",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(4).png?alt=media&token=d85cea7f-6a41-496c-a09c-02daa00e0c01",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(5).png?alt=media&token=a7729284-61d5-404f-8890-029988f35f9d",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(6).png?alt=media&token=d9e439d0-a6af-4458-9f47-d71d6fd0172e",
        "https://firebasestorage.googleapis.com/v0/b/belajar2-85049.appspot.com/o/spritesheet%20(7).png?alt=media&token=bea65a38-dfe0-4959-a5ea-f5f576737a3e"
    ];

    const submitHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            let rand = Math.floor(Math.random() * 9);

            if(!age || !gender){
                Swal.fire("Whoops!", "The form field is invalid", 'error');
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/user/setinfo/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    age,
                    gender,
                    weight: e.target[0].value,
                    height: e.target[1].value,
                    daily_activity,
                    profileImage: image[rand]
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.messsage);
            Swal.fire("Niccee..!", data.message, 'success').then(() => router.push('/dashboard'));
        } catch (error: any) {
            console.log({ error });
            Swal.fire("Whoops!", error, 'error');
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="h-[95vh] w-11/12 gap-12 lg:w-8/12 mx-auto flex items-center">
            {/* image */}
            <div className="container w-fit py-20 px-16 bg-green-400 rounded-md">
                {gender == "perempuan" ? (
                    <img src={`${womanpic.src}`} alt="" />
                ) : (
                    <img src={`${manpic.src}`} alt="" />
                )}
            </div>

            {/* forms */}

            <div>
                <div className="font-semibold text-[48px]">
                    Im the healthy one.
                </div>

                <p>Hello Bafria, Before we start let us know about you more please fill with the correct value</p>

                {isErr ? (
                    <div className="alert my-3 p-3 rounded-md bg-red-600 border-t-2 border-slate-900 text-white shadow-lg">
                        {isErr}
                    </div>
                ) : null}


                <form action="" onSubmit={submitHandler} method="post">
                    <div className="flex gap-4 mt-4">
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Weight</label>
                            <input type="number" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Masukan Berat Badan" />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Height</label>
                            <input type="number" id="success" className=" md:min-w-[300px] bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Masukan Tinggi Badan dalam Cm" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <select id="countries" onChange={(e) => setGender(e.target.value)} className="bg-gray-50 border max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                            <option selected>Pilih Jenis Kelamin</option>
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
                                <input type="number" min={1} value={age} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="md:min-w-[100px] bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Your age" required />
                                <button onClick={() => setAge(age + 1)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                    umur
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <select id="countries" required onChange={(e) => setDailyAct(e.target.value)} className="bg-gray-50 border mt-4 max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                            <option selected>Pilih Intensitas aktifitas harian</option>
                            <option value="level1">Minim aktifitas</option>
                            <option value="level2">Aktifitas ringan, olahraga ringan</option>
                            <option value="level3">Aktifitas sedang, olahraga sedang</option>
                            <option value="level4">Aktifitas berat, olahraga berat</option>
                            <option value="level5">Aktivitas sangat berat</option>
                        </select>

                        <button type="submit" className="mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 ">
                            {!loading ? `Confirmasi form` : `Loading..`}
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserInfo;