import { useDispatch } from "react-redux";
import { getData } from "../apiProviderService";
import { closeLoading, openLoading } from "../../store/models/modelsSlice";
import { setHasCv, setMainContents, setPersonalData } from "../../store/resume/resumeSclice";

export default async function GetResumeData (dispatch)  {
    dispatch(openLoading());
    let id = 2;
    let url = `resume/${id}` 
    try {
      const response = await getData(url);
      if (response.data.success && response.data.result != null) {
        console.log(response.data)
        dispatch(closeLoading());
        dispatch(setMainContents(response.data.result.mainContents));
        dispatch(setPersonalData(response.data.result.personalData));
        dispatch(setHasCv((response.data.result.mainContents != null || response.data.result.personalData != null) ? true : false));
      }else {
        dispatch(closeLoading());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(closeLoading());
    }
  };