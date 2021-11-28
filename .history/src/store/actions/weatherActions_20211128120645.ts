import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR,
} from "../types";

export const getWeather = (
  city: string
): ThunkAction<void, RootState, null, WeatherAction> => {
  return async (dispatch) => {
    try {
      const res =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${''}&appid=3b309239cd99cc24b374211193ee07ec`);

      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING,
  };
};

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: "",
  };
};
