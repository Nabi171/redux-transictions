import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../components/features/transiction/transactionSlice"
export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
    },
});
