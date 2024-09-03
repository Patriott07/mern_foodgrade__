'use client';

import Image from 'next/image';
import HandPhoto from '@/app/image/hand.png';
import type { StaticImageData } from 'next/image';
import { useState } from 'react';

import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@reduxjs/toolkit/query';
import { RootState } from '@/app/redux/store';
import { logout } from '@/app/redux/slicers/userSlicer';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';


function ForgetPasswordComp() {
    const router = useRouter();
    const [succes, setSucces] = useState<string>("");
    const { authInfo } = useSelector((state: RootState) => state.user);

    const dispacth = useDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/forgetpassword`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: authInfo.email
                }),
                method: "POST"
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message);

            // Swal.fire("Yohooo!", data.message, 'success');
            setSucces(data.message);
            dispacth(logout());
        } catch (err: any) {
            console.log({ err });
            Swal.fire("Whoopps!", err, 'error');
        }
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-3xl mb-5 font-medium">Minta Sandi Baru</div>
                    <form action="" onSubmit={handleSubmit} method="post" className='flex flex-col gap-4 lg:min-w-[450px] max-w-[450px]'>

                        {succes ? (
                            <div className="w-fit px-4 py-2 text-white bg-green-500 text-sm rounded-lg">
                                {succes}
                            </div>
                        ) : null}
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat Email</label>
                            <input disabled type="email" id="password" className="bg-gray-400/50 border border-slate-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={authInfo.email} required />
                        </div>
                        <p className='text-sm'>
                            Pastikan anda masih memiliki akses ke email anda. kami akan mengirimkan kata sandi baru pada email anda.
                        </p>

                        <div className="flex gap-3">
                            <button type="submit" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                Kirim Sekarang
                                <FaArrowRight size={18} className="ms-2.5" />
                            </button>
                            <button onClick={() => router.push('/dashboard')} type="button" className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                Kembali
                                <IoIosCloseCircle size={18} className="ms-2.5" />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-fit">
                    <Image src={HandPhoto} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordComp;