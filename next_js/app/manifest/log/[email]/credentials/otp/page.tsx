"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function OTPVerif() {
    const router = useRouter();
    const { email } = useParams();
    const [otpVal, setOtpVal] = useState<string[]>(["", "", "", ""]);

    const handleChange = (value: string, index: number) => {
        const newOtpVal = [...otpVal];
        newOtpVal[index] = value;
        setOtpVal(newOtpVal);

        // Auto focus to next input
        if (value !== "" && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const otpCode = otpVal.join(""); // Combine all input values into a single string
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/verifyotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email : String(email).replace('%40', '@'), kode: otpCode }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);
            Swal.fire('Congratss!', data.message , 'success').then(() => router.push(`/user/info/${data.id}`) );
        } catch (error:any) {
            Swal.fire('Whoopss', error.message, 'error');
        }
    };

    const handleResendOtp = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/refreshotp`, {
                body: JSON.stringify({ email : String(email).replace('%40', '@') }),
                headers: {
                    'Content-Type': "application/json"
                },
                method: "POST"
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message);
        } catch (err : any) {
            Swal.fire('Something wrong', err.message, 'error')
        }
    }

    return (
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                <div className="flex justify-center">
                    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                        <header className="mb-8">
                            <h1 className="text-2xl font-bold mb-1">Code Verification</h1>
                            <p className="text-[15px] text-slate-500">
                                Enter the 4-digit verification code that was sent to your Email Address.
                            </p>
                        </header>
                        <form id="otp-form" onSubmit={handleSubmit}>
                            <div className="flex items-center justify-center gap-3">
                                {otpVal.map((val, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="number"
                                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        maxLength={1}
                                        value={val}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                    />
                                ))}
                            </div>
                            <div className="max-w-[260px] mx-auto mt-4">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                                >
                                    Verify Account
                                </button>
                            </div>
                        </form>
                        <div className="text-sm text-slate-500 mt-4">
                            Didn't receive code from {String(email).replace('%40', '@')}{" "}
                            <a onClick={(e) => handleResendOtp(e)} className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                                Resend
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
