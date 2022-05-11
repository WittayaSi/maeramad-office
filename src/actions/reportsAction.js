import axios from 'axios'
import { API_URL } from '../types/constantTypes'

export const getEachMaterialReport = async (materialId) => {
    try {
        console.log(materialId)
        const response = await axios.get(`${API_URL}/report/each-material?materialId=${materialId}`)
        const data = await response.data
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}