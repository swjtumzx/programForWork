import { User } from "screens/project-list/search-panel";
import { createSlice } from '@reduxjs/toolkit';
import * as auth from 'auth-provider'
import { AuthForm, BootstrapUser } from "context/auth-context";
import { AppDisPatch, RootState } from './index';


interface State{
    user:User | null

}

const initialState:State={
    user:null
}

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        }
    }
})

const {setUser}=authSlice.actions;

export const selectUser = (state:RootState) => state.auth.user;

export const login=(form:AuthForm) => (dispatch:AppDisPatch) => auth.login(form).then(user => dispatch(setUser(user)));
export const register=(form:AuthForm) => (dispatch:AppDisPatch) => auth.register(form).then(user => dispatch(setUser(user)));
export const logout=() => (dispatch:AppDisPatch) => auth.logout().then(user => dispatch(setUser(null)));
export const bootstrap=()=> (dispatch:AppDisPatch) => BootstrapUser().then(user => dispatch(setUser(user)))