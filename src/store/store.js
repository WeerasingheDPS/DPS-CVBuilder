import { configureStore } from "@reduxjs/toolkit";
import modelsReducer from './models/modelsSlice';
import resumeReducer from "./resume/resumeSclice";
export const store = configureStore({
    reducer: {
        models: modelsReducer,
        resume: resumeReducer,
    }
})