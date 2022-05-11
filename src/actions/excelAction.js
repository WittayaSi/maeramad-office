import axios from 'axios'

import { API_URL } from '../types/constantTypes'

export const downloadExcelFile = async (type) => {
    try{
        // console.log(type);
        const { config: { url }} = await axios.get(`${API_URL}/excel/download?type=${type}`)
        // console.log(url);

		let a = document.createElement('a')
        a.href = url
        a.click()
        
    } catch(err) {
        // console.log(err);
    }
}