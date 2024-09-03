import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const secretKey = "mySecretKey";

interface __authinfo {
    _id: string,
    username: string,
    email: string,
    role: string,
    age: number,
    gender: string,
    height: number,
    weight: number
    profileImage: string,
    isVerified: boolean,
    daily_activity : string
}

export interface CounterState {
    isAuth: boolean,
    authInfo: __authinfo,
    room: string | null
}

const initialState: CounterState = {
    isAuth: false,
    authInfo: {
        _id: "",
        username: "",
        email: "",
        role: "",
        age: 0,
        gender: "",
        height: 0,
        weight: 0,
        profileImage: "",
        isVerified: false,
        daily_activity : ""
    },
    room: null
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, property: PayloadAction<__authinfo>) => {
            state.isAuth = true;
            state.authInfo = property.payload;
            Cookies.set('ia', "true"); // isAuth
            Cookies.set('rb', CryptoJS.AES.encrypt(property.payload.role, secretKey).toString().replace(/\//g, '_')) //role based
        },
        logout: (state) => {
            state.isAuth = false;
            state.authInfo = {
                _id: "",
                username: "",
                email: "",
                role: "",
                age: 0,
                gender: "",
                height: 0,
                weight: 0,
                profileImage: "",
                isVerified: false,
                daily_activity : ""
            };
            
            Cookies.remove('ia');  // isAuth
            Cookies.remove('rb') //role based
        },
        setRoom: (state, property: PayloadAction<string>) => {
            state.room = property.payload;
        },
        unsetRoom: (state) => {
            state.room = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, setRoom, unsetRoom } = counterSlice.actions

export default counterSlice.reducer;