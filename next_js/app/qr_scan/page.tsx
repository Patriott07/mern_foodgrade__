"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Swal from 'sweetalert2';
import { useDispatch, UseDispatch } from "react-redux";
import { login } from '@/app/redux/slicers/userSlicer';
import { useRouter } from "next/navigation";


const QrScannerPage = () => {
    const [resultQrCode, setScanResult] = useState("");
    const dispactch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        console.log({ resultQrCode });
 
    }, [resultQrCode]);

    const fetchPost = async (e: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/qrcode`, {
                headers: {
                    'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify({ e })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            console.log({ data });
            dispactch(login(data.user));
            router.push('/dashboard');
        } catch (err: any) {
            console.log({err})
            Swal.fire("Whopps!",  err, 'error');
        }

    }

    useEffect(() => {
        const scanner: any = new Html5QrcodeScanner("scanner", {
            qrbox: {
                width: 1250,
                height: 1250
            },
            fps: 10
        }, undefined);

        const succesCallback = (result: any) => {
            // scanner.clear();
            setScanResult(result);
            fetchPost(result);
        }
        const errorCallback = (err: any) => {
            console.log({ err });
        }

        scanner.render(succesCallback, errorCallback);
    }, []);

    return (
        <div className="h-[100vh] flex w-11/12 lg:w-8/12 mx-auto items-center gap-20">
            <div className="w-[400px] rounded-lg h-[90vh] bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
                <div className="w-[400px] flex items-end rounded-lg h-[90vh] bg-black/70">

                    <div className="text-[18px] font-semibold text-white p-6 py-8">
                        Hidup yang sehat lahir dari kebiasaan yang hebat. jadilah member kami untuk mengikuti program sehat
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
                <div id="scanner">

                </div>

                <p className="">{resultQrCode ? 'Can See any. Try Again' : (
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <p>Try to scan now to quick actions.</p>
                        <div className="loader"></div>
                    </div>
                )}</p>
            </div>
        </div>
    )
}

export default QrScannerPage;