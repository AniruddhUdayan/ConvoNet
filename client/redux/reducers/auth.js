import { createSlice } from '@reduxjs/toolkit';
import { adminLogin } from '../thunks/admin';
import toast from 'react-hot-toast';


const initialState = {
    user: null,
    isAdmin: false,
    loader: true
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       userExits : (state , action) => {
              state.user = action.payload;
              state.loader = false;
       },
       userNotExists : (state) => {
                state.user = null;
                state.loader = false;
         }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(adminLogin.fulfilled, (state, action) => {
    //         state.isAdmin = true;
    //         toast.success(action.payload);
    //     })
    //     .addCase(adminLogin.rejected, (state, action) => {
    //         state.isAdmin = false;
    //         toast.error(action.error.message);
    //     })
    // }
});

export default authSlice;
export const { userExits , userNotExists } = authSlice.actions;