'use client';

import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io("http://localhost:5072");
export default function ManageFood(){
    useEffect(() => {
        socket.on('notification', (msg) => {
            console.log('Message from server:', msg);
            alert(msg);
        })

        return () => {
            // Cleanup ketika komponen unmount
            socket.disconnect();
        };
    }, []);
    return (
        <h1>Manage foods</h1>
    )
}
