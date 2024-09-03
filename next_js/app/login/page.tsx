'use client';

import React from "react";
import { FormAuth } from '@/app/components/Forms';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import {login} from '@/app/redux/slicers/userSlicer';
import { useDispatch, UseDispatch } from "react-redux";

interface __authinfo {
    _id: string,
    username: string,
    email: string,
    role : string,
    age : number,
    gender : string,
    height : number,
    weight : number
    profileImage : string,
    isVerified : boolean,
    daily_activity : string
}

const Login: React.FC = () => {

    const router = useRouter();
    const dispactch = useDispatch();

    const handle = async(e: any) => {
        e.preventDefault();
        // console.log({e});
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
                method : "POST",
                body : JSON.stringify({
                    email :  e.target[0].value,
                    password : e.target[1].value,
                }),
                headers : {
                    'Content-Type' : "application/json"
                }
            });
            const data = await res.json();

            if(!res.ok) throw new Error(data.message);

            console.log({data, role : data.user.role})
            if(!data.user.weight){
                router.push(`/user/info/${data.user._id}`);
                return;
            }

            const userInfo : __authinfo = {
                _id: data.user._id,
                username: data.user.username,
                email: data.user.email,
                role : data.user.role,
                age : data.user.age,
                gender : data.user.gender,
                height : data.user.height,
                weight : data.user.weight,
                profileImage : data.user.profileImage,
                isVerified : data.user.isVerified,
                daily_activity : data.user.daily_activity
            };

            dispactch(login(userInfo));
            // router.push('/dashboard');
            window.location.assign('/dashboard'); 

        }catch(err : any){
            Swal.fire("Whoops!", err, 'error');
        }
    }
    return (
        <FormAuth type='login' handleSubmit={handle} />
    )
}

export default Login;

