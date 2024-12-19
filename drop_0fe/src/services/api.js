import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

export const fetchDropOutRates = async (state, year) => {
    try {
        const response = await axios.get(`${API_URL}dropoutdata/?state=${state}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching drop out rates:', error);
        throw error;
    }
}

export const fetchStates = async () => {
    try {
        const response = await axios.get(`${API_URL}states/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching states:', error);
        throw error;
    }
}