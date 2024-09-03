"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { RootState } from '@/app/redux/store';
import { useSelector, useDispatch } from 'react-redux';

// import ProtectedRoute from "../lib/protectRoute/protect";

export default function Dashboard() {

    // const {}
    const {authInfo, isAuth} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        console.log({authInfo, isAuth})
    }, []);

    return (
        <div>
            {/* protect route */}
            <h1>Dashborad management</h1>
        </div>
    );
}
