"use client";

import type { RootState } from '@/app/redux/store';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

const ProtectedRoute = () => {
    const {authInfo, isAuth} = useSelector((state: RootState) => state.user);
    const router = useRouter();
    if(!isAuth) router.push('/login');
}

export default ProtectedRoute;