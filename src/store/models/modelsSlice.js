import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applyJob: false,
    collapsed:true,
    customContent:false,
    addLink:false,
    viewEditDetails:false,
    addContent:false,
    loading:false,
    canselJob:false,
    registrationComplete:false,
}

const modelsSlice = createSlice({
    name: 'models',
    initialState,
    reducers:{
        openApplyEvent:(state)=>{
            state.applyEvent = true;
        },
        closeApplyEvent:(state)=>{
            state.applyEvent = false;
        },
        openApplyJob:(state)=>{
            state.applyJob = true;
        },
        closeApplyJob:(state)=>{
            state.applyJob = false;
        },
        setCollapsed:(state)=>{
            state.collapsed= !state.collapsed;
        },
        openCustomContent:(state)=>{
            state.customContent = true;
        },
        closeCustomContent:(state)=>{
            state.customContent = false;
        },
        openAddLink:(state)=>{
            state.addLink = true;
        },
        closeAddLink:(state)=>{
            state.addLink = false;
        },
        openViewEditDetails:(state)=>{
            state.viewEditDetails = true;
        },
        closeViewEditDetails:(state)=>{
            state.viewEditDetails = false;
        },
        openAddContent:(state)=>{
            state.addContent = true;
        },
        closeAddContent:(state)=>{
            state.addContent = false;
        },
        openLoading:(state)=>{
            state.loading= true;
        },
        closeLoading:(state)=>{
            state.loading = false;
        },
        openCanselJob:(state)=>{
            state.canselJob= true;
        },
        closeCanselJob:(state)=>{
            state.canselJob = false;
        },
        openRegistrationComplete:(state)=>{
            state.registrationComplete= true;
        },
        closeRegistrationComplete:(state)=>{
            state.registrationComplete = false;
        },

        
    }
})

export const { 
    openApplyJob, 
    openApplyEvent,
    closeApplyEvent,
    closeApplyJob, 
    setCollapsed,
    openCustomContent, 
    closeCustomContent,
    openAddLink,
    closeAddLink,
    openViewEditDetails,
    closeViewEditDetails,
    openAddContent,
    closeAddContent,
    openLoading,
    closeLoading,
    openCanselJob,
    closeCanselJob,
    closeRegistrationComplete,
    openRegistrationComplete
} = modelsSlice.actions;

export const getLoading = (state) => state.models.loading;

export default modelsSlice.reducer;