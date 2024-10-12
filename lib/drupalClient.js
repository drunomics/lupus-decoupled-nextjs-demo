import axios from "axios"

const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const ceApiEndpoint = '/ce-api'

const drupalClient = axios.create({
    baseURL: `${drupalBaseUrl}${ceApiEndpoint}`,
    withCredentials: true
});

export async function fetchMenu() {
    try {
        const response = await drupalClient.get('/menu-items');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch menu:', error);
        throw error;
    }
}

export async function fetchPage(nodeId) {
    try {
        const response = await drupalClient.get(`node/${nodeId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch page:', error);
        throw error;
    }
}