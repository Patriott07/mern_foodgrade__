'use client';

import React from "react";
import { FormAuth } from '@/app/components/Forms';
import { handleRegister } from './actions';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
    const router = useRouter();
    const handleRegister = async(e : any) :Promise<any> => {
        e.preventDefault();
        // console.log({e})
        let formdata = new FormData(e.target);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/register`, {
                method: "POST",
                body: JSON.stringify({
                    username : e.target[0].value,
                    email : e.target[1].value,
                    password : e.target[2].value,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message);
            console.log({res, data});
            Swal.fire('Yohoo!', data.message, 'success').then(() => router.push(`/manifest/log/${data.user.email}/credentials/otp`));

        } catch (err: any) {
            console.log({err});
            Swal.fire('Whoops!', err.message, 'error');
        }
    }

    return (
        <FormAuth type='register' handleSubmit={handleRegister} />
    )
}

export default Register;

