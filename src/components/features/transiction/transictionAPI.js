import axios from "../../../utils/axios";

export const getTransictions = async () => {
    const response = await axios.get('/transictions');
    return response.data;
}

export const addTransictions = async (data) => {
    const response = await axios.post("/transactions", data);
    return response.data;
};

export const editTransactions = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data;
}

export const deleteTransactions = async (id) => {
    const response = await axios.delete(`/transactions/${id}`);
    return response.data;
}

