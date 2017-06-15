import { buildURL, formatWeatherData } from '../utils/weatherUtils';
import axios from 'axios';

const initialState = {
  error: false,
  loading: false,
  search: true,
  weather: {}
};

const RESET = "RESET";
const SET_WEATHER = 'SET_WEATHER';
const SET_WEATHER_PENDING = 'SET_WEATHER_PENDING';
const SET_WEATHER_FULFILLED = 'SET_WEATHER_FULFILLED';
const SET_WEATHER_REJECTED = 'SET_WEATHER_REJECTED';

export default function weather( state = initialState, action ) {
  switch ( action.type ) {
    case RESET: 
      return initialState;
    case SET_WEATHER_PENDING:
      return {
        error: false,
        loading: true,
        search: false,
        weather: {}
      };
    case SET_WEATHER_FULFILLED:
      return {
        error: false,
        loading: false,
        search: false,
        weather: action.payload
      };
    case SET_WEATHER_REJECTED:
      return {
        error: true,
        loading: false,
        search: false,
        weather: {}
      };
    default: 
      return state;
  }
}

export function reset() {
  return { type: RESET };
}

export function setWeather(location){
  // var URL = buildURL(location);
  var URL = 'api.openweathermap.org/data/2.5/weather?q=provo&appid=a4de2f635bec41b2f05fca35f319ee33';
  var promise = axios.get( URL ).then(res => {
    formatWeatherData(res.data);
  })
  return {
    type: SET_WEATHER,
    payload: promise
  }
}
