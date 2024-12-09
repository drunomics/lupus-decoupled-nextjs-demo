import axios from "axios"

const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const ceApiEndpoint = '/ce-api'

type PageData = {
    title: string;
    metatags: {
        meta: { name: string; content: string; }[];
        link: { rel: string; href: string; }[];
    };
    messages?: string[] | Record<string, any>;
    breadcrumbs: { text: string; url: string; }[];
    content: {
        element: string;
        [key: string]: any;
    };
}

type MenuItem = {
    title: string;
    url: string;
    children?: MenuItem[];
}

const drupalClient = axios.create({
    baseURL: `${drupalBaseUrl}${ceApiEndpoint}`,
    withCredentials: true
});

export async function fetchMenu(): Promise<MenuItem[]> {
    try {
        const response = await drupalClient.get<MenuItem[]>('/api/menu_items/main');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch menu:', error);
        throw error;
    }
}

export async function fetchPage(path: string): Promise<PageData> {
    try {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const response = await drupalClient.get<PageData>(cleanPath);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch page:', error);
        throw error;
    }
}