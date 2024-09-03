"use client";
import { useEffect, useState } from 'react';
import { getUsers } from './fetchuser';
import Link from 'next/link';


export default async function ManageUser() {

    const usersData = await getUsers();
    // console.log(usersData);
    return (
        <>
            <div className="overflow-x-auto mx-auto md:mx-12 text-sm py-20">
                <div className="flex justify-between md:justify-between my-4">
                    <div className="text-2xl font-semibold">Manage users</div>
                    <div className="w-fit px-3 py-1 bg-slate-800 rounded-md text-white">Add users +</div>
                </div>
                <table className="shadow-md  w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[12px] text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 md:table-cell hidden">
                                #
                            </th>
                            <th scope="col" className="md:px-6 px-4  py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 md:table-cell hidden">
                                calori goals
                            </th>
                            <th scope="col" className="px-6 py-3 md:table-cell hidden">
                                water goals
                            </th>
                            <th scope="col" className="px-6 py-3 lg:table-cell hidden">
                                Weight
                            </th>
                            <th scope="col" className="px-6 py-3 lg:table-cell hidden">
                                Height
                            </th>
                            <th scope="col" className="md:px-6 px-4 py-3">
                                Age
                            </th>
                            <th scope="col" className="md:px-6 px-4  py-3">
                                gender
                            </th>
                            <th scope="col" className="md:px-6 px-12 py-3">
                                actions
                            </th>


                        </tr>
                    </thead>
                    <tbody className='text-[12px]'>
                        {
                            usersData.map((val, i) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium md:table-cell hidden text-gray-900 whitespace-nowrap dark:text-white">
                                            {i + 1}
                                        </th>
                                        <td className="md:px-6 px-2 py-4">
                                            {val.username}
                                        </td>

                                        <td className="px-6 py-4 md:table-cell hidden">
                                            {val.daily_caloric_goal}

                                        </td>
                                        <td className="px-6 py-4 md:table-cell hidden">
                                            {val.daily_water_goal}

                                        </td>
                                        <td className="px-6 py-4 lg:table-cell hidden">
                                            {val.weight}
                                        </td>
                                        <td className="px-6 py-4 lg:table-cell hidden">
                                            {val.height}

                                        </td>
                                        <td className="md:px-6 px-2  py-4">
                                            {val.age}

                                        </td>
                                        <td className="md:px-6 px-2  py-4">
                                            {val.gender}

                                        </td>
                                        <td className="md:px-6 px-2 flex gap-1 py-4">
                                            <Link className='w-fit px-2 py-1 bg-yellow-400 text-white font-semibold rounded-md' href={`/update/users`}>
                                                Update
                                            </Link>
                                            <Link className='w-fit px-2 py-1 bg-red-600 text-white font-semibold rounded-md' href={`/update/users`}>
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>


        </>
    )
}
