import { createSlice } from "@reduxjs/toolkit";

const  initialSnackBarState = {isOpen: false, message: '', severity: 'success'};

const snackBarSlice = createSlice({
    name : 'snackBar',
    initialState: initialSnackBarState,
    reducers: {
        open(state, action: {payload: {message: string, severity: string}}) {
            state.isOpen = true
            state.message = action.payload.message
            state.severity = action.payload.severity
        },
        close(state: any) {
            state.isOpen = false
        }
    }
});

export const snackBarActions = snackBarSlice.actions;

export default snackBarSlice;