import axios from "axios";
import { getUserInfo } from "../utils/auth";

const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

const getConfig = () => {
    const userInfo = getUserInfo();
    return {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };
};

export const getNotes = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

export const createNote = async (noteData) => {
    const response = await axios.post(API_URL, noteData, getConfig());
    return response.data;
};

export const updateNote = async (id, noteData) => {
    const response = await axios.put(`${API_URL}/${id}`, noteData, getConfig());
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getConfig());
    return response.data;
};