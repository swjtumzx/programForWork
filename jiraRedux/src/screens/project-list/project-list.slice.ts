import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Project } from './list';

type Edit=Project | {}

interface State{
    projectModalOpen : boolean;
    isLoading:boolean;
    editing:boolean;
    editingProject:Edit;
}

const initialState={
    projectModalOpen:false,
    isLoading:false,
    editing:false,
    editingProject: {}
}


export const projectListSlice=createSlice({
    name:'projectListScreen',
    initialState,
    reducers:{
        closeProjectModal(state:State){
            state.projectModalOpen=false;
        },
        editProject(state,action:PayloadAction<Edit>){
            state.editingProject=action.payload;
            state.editing=true;
            state.projectModalOpen=true;
        },
        addProject(state){
            state.editingProject={};
            state.editing=false;
            state.projectModalOpen=true;
        }
    }
})

export const projectListActions=projectListSlice.actions;

export const selectProjectModal= (state:RootState) => state.projectList;