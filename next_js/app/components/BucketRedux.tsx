"use client";
import { Provider } from "react-redux";
import { store } from '@/app/lib/store';
import { ReactNode } from "react";

interface BucketReduxProps {
    children: ReactNode;
}

export default function BucketRedux({children} : BucketReduxProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}