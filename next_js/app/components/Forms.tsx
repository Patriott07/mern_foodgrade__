'use client';

import React, { FormEventHandler } from "react";
import Link from "next/link";

interface formAuthProps {
    type: string
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormAuth: React.FC<formAuthProps> = ({ type, handleSubmit }) => {

    return (
        <section >
            <div className="grid md:h-screen h-[95vh] md:grid-cols-2">
                <div className="flex flex-col items-center justify-center bg-white">
                    <div className="max-w-lg px-5 py-8 text-center md:px-10">
                        <div className="text-start px-4 font-semibold">
                            {type == 'login' ? 'Login' : 'Register'} Form <br />
                    
                        </div>
                        <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-3xl">Start Bringing good life with goodfood.</h2>
                        <form className="mx-auto mb-4 max-w-sm pb-4" name="wf-form-password" onSubmit={handleSubmit} method="get">
                            {type == 'register' ? (

                                <div className="relative">
                                    <input type="text" className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 text-sm text-[#333333]" name="name" placeholder="Your name.." required />
                                </div>
                            ) : null}
                            <div className="relative">
                                <img alt="" src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg" className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
                                <input type="email" className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]" name="name" placeholder="Email Address" required />
                            </div>
                            <div className="relative mb-4">
                                <img alt="" src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg" className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
                                <input type="password" className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]" min={8} placeholder="Password (min 8 characters)" required />
                            </div>

                            <button type="submit" className="flex items-center justify-center bg-green-500 px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
                                <p className="mr-6 font-bold">{type == "login" ? 'Masuk sekarang' : 'Mendaftar Sekarang'}</p>
                                <svg className="h-4 w-4 flex-none" fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                                    <title>Arrow Right</title>
                                    <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                                </svg>
                            </button>
                        </form>
                        {type == 'login' ? (
                            <p className="text-sm text-[#636262]">Doesnt have an account? <Link href="/register" className="text-sm font-bold text-black">Register now</Link>
                            </p>
                        ) : (
                            <p className="text-sm text-[#636262]">Already have an account? <Link href="/login" className="text-sm font-bold text-black">Login now</Link>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-cover bg-bottom bg-[url('https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">

                    <div className="max-w-lg px-5 py-16 md:px-10 md:py-24 lg:py-32 bg-black/60 text-white">
                        <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-[#276ef1] [box-shadow:rgb(171,_196,_245)_-8px_8px]">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f5ec37c8c32b17d1c725_Vector-9.svg" alt="" className="inline-block" />
                        </div>
                        <p className="mb-8 md:mb-12 lg:mb-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim.</p>
                        <p className="font-bold">John Robert</p>
                        <p className="text-sm">Senior Webflow Developer</p>
                    </div>
                </div>
            </div>

        </section>
    )
}