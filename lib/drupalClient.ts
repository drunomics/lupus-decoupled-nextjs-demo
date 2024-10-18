import axios from "axios"

const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const ceApiEndpoint = '/ce-api'
import { mockData, mockData2, redirectMockData } from "../mockData"

const drupalClient = axios.create({
    baseURL: `${drupalBaseUrl}${ceApiEndpoint}`,
    withCredentials: true
});

export async function fetchMenu() {
    try {
        const response = await drupalClient.get('/api/menu_items/main');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch menu:', error);
        throw error;
    }
}

export async function fetchPage(nodeId: string) {
    try {
        const response = await drupalClient.get(`node/${nodeId}`);
        // const response = mockData
        return response.data;
        // return response
    } catch (error) {
        console.error('Failed to fetch page:', error);
        throw error;
    }
}

export async function fetchAlias(alias: string) {
    try {
        const response = await drupalClient.get(`${drupalBaseUrl}/${alias}`)
        // const response = redirectMockData
        return response.data
    } catch(error) {
        console.error("Failed to fetch alias:", error)
        throw error
    }
}