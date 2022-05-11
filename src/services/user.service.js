import axios from 'axios'
import authHeader  from './auth.header'

import { API_URL } from '../types'

export const getPublicContent = () => {
    return axios.get(API_URL + '/auth/all')
}

export const getUserBoard = () => {
    return axios.get(API_URL + "/auth/user", { headers: authHeader() });
};
  
export const getModeratorBoard = () => {
    return axios.get(API_URL + "/auth/mod", { headers: authHeader() });
  };
  
export const getAdminBoard = () => {
    return axios.get(API_URL + "/auth/admin", { headers: authHeader() });
  };