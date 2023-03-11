import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransictions, addTransictions, deleteTransactions, editTransactions } from "./transictionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
}

//async thunks
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransictions();
    return transactions;
})

export const createTransactions = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transactions = await addTransictions(data);
    return transactions;
})

export const changeTransactions = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
    const transactions = await editTransactions({ id, data });
    return transactions;
})

export const removeTransactions = createAsyncThunk('transaction/removeTransaction', async (id) => {
    const transactions = await deleteTransactions(id);
    return transactions;
})

//create slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error ?.message;
                state.transactions = [];
            })

            //createTransactions
            .addCase(createTransactions.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true
            })
            .addCase(createTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransactions.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error ?.message;

            })

            //changeTransactions
            .addCase(changeTransactions.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true
            })
            .addCase(changeTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                const indexToUpdate = state.transaction.findIndex((t) => t.id === action.payload.id);

                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(changeTransactions.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error ?.message;

            })

            //removeTransactions
            .addCase(removeTransactions.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true
            })
            .addCase(removeTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;

                state.transactions = state.transactions.filter(t => t.id !== action.payload);
            })
            .addCase(removeTransactions.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error ?.message;

            })
    }
})

export default transactionSlice.reducer;