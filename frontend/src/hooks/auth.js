import { writable } from 'svelte/store';
import axios from "axios";

const config = {
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
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

export const getIntroduction = async (id, name) => {
    const postData = {
        is: id,
        name: name,
    };
    const response = await  axios.post('http://localhost:3888/head/speech', postData, config);
    console.log(response.data);
    return response.data;
}