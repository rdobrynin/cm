import { writable } from 'svelte/store';
import axios from "axios";

const config = {
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        // 'Authorization': 'Bearer ',
    },
};
export const store = writable(null);

let sessions = []

export const loginUser= async ( email, password ) => {
    const postData = {
        email: email,
        password: password,
    };
    const response = await  axios.post('http://localhost:3888/auth/login', postData, config);
    console.log(response.data);
    return response.data.token;
}

export const signUpUser= async ( email, password ) => {
    const postData = {
        email: email,
        password: password,
    };
    const response = await  axios.post('http://localhost:3888/user', postData, config);
    console.log(response.data);
    return response.data;
}