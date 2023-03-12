import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransictions, addTransictions, deleteTransactions, editTransactions } from "./transictionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
}

//async thunks
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransictions();
    return transactions;
})

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transaction = await addTransictions(data);
    return transaction;
})

export const changeTransactions = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
    const transaction = await editTransactions(id, data);
    return transaction;
})

export const removeTransactions = createAsyncThunk('transaction/removeTransaction', async (id) => {
    const transactions = await deleteTransactions(id);
    return transactions;
})

//create slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state) => {
            state.editing = {};
        },
    },
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
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
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

                // state.transactions = state.transactions.filter(t => t.id !== action.payload);
                state.transactions = state.transactions.filter(t => t.id !== action.meta.arg);
            })
            .addCase(removeTransactions.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error ?.message;

            })
    }
})

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;