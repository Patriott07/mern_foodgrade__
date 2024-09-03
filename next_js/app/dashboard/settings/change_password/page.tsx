'use client';

import Image from 'next/image';
import HandPhoto from '@/app/image/hand.png';
import type { StaticImageData } from 'next/image';
import { useState } from 'react';

import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

function ChangePasswordComp() {

    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [passwordConf, setPasswordConf] = useState<string>("");

    const {authInfo} = useSelector((state : RootState) => state.user);

    const handleSubmit = async(e : any) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/changepassword`, {
                headers : {
                    'Content-Type' : 'application/json',
                    'token' : authInfo._id
                },
                body : JSON.stringify({
                    oldpassword : e.target[0].value,
                    newPassword : password
                }),
                method : "POST"
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message);
            
            Swal.fire('Yohoo!', data.message, 'success').then(() => router.push('/dashboard'));

        } catch (error : any) {
            console.log({error});
            Swal.fire("Whoopss!", error.message, 'error');
        }
    }

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <div className="text-3xl mb-5 font-medium">Ubah Kata Sandi Anda.</div>
                    <form onSubmit={handleSubmit} action="" method="post" className='flex flex-col gap-4 lg:min-w-[450px]'>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>

                        {password != passwordConf || passwordConf == '' ? (

                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} type="password" id="password" className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg border-red-600 focus:border-red-600 placeholder-red-600 focus:ring focus:ring-red-600 block w-full p-2.5" placeholder="•••••••••" required />
                                <div className="text-sm mt-2 text-red-500">Kata sandi anda tidak cocok.</div>
                            </div>
                        ) : (
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} type="password" id="password" className="bg-gray-50 border-2 text-gray-900 text-sm border-green-600 rounded-lg placeholder-green-600 focus:ring focus:ring-green-600 block w-full p-2.5" placeholder="•••••••••" required />
                                <div className="text-sm mt-2 text-green-600">Kata sandi anda cocok.</div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button type="submit" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                Ubah Kata Sandi
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

export default ChangePasswordComp;