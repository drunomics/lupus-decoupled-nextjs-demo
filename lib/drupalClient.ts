import axios, { AxiosResponse, AxiosError } from "axios"
import { ServerResponse } from 'http';

const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const ceApiEndpoint = '/ce-api'

type PageData = {
    title?: string;
    metatags?: {
        meta: { name: string; content: string; }[];
        link: { rel: string; href: string; }[];
    };
    messages?: string[] | Record<string, any>;
    breadcrumbs?: { text: string; url: string; }[];
    content?: {
        element: string;
        [key: string]: any;
    };
    statusCode?: number;
    redirect?: {
        url: string;
        statusCode: number;
        external: boolean;
    };
}

type MenuItem = {
    title: string;
    url: string;
    children?: MenuItem[];
}

type ErrorResponse = {
    statusCode: number;
    message: string;
    data?: PageData;
}

const DEFAULT_FETCH_PROXY_HEADERS = ['cookie'];
const DEFAULT_PASS_THROUGH_HEADERS = [
    'cache-control',
    'content-language',
    'set-cookie',
    'x-drupal-cache',
    'x-drupal-dynamic-cache'
];

export const drupalClient = axios.create({
    baseURL: `${drupalBaseUrl}${ceApiEndpoint}`,
    withCredentials: true
});

function handleError(error: AxiosError, serverResponse?: ServerResponse): ErrorResponse {
    if (error.response) {
        const responseData = error.response.data as PageData;
        responseData.statusCode = error.response.status;
        
        if (serverResponse) {
            serverResponse.statusCode = error.response.status;
        }

        return {
            statusCode: error.response.status,
            message: error.message,
            data: responseData
        };
    } else if (error.request) {
        return {
            statusCode: 503,
            message: error.message
        };
    } else {
        return {
            statusCode: 400,
            message: error.message
        };
    }
}

function validateResponse(data: PageData): void {
    if (!(data.title || data.content) && !data.redirect) {
        throw {
            statusCode: 422,
            message: 'Malformed API response. Please make sure to install Custom Elements renderer: https://www.drupal.org/project/lupus_ce_renderer'
        };
    }
}

function handleRedirect(data: PageData, serverResponse?: ServerResponse) {
    if (!data.redirect) return false;

    if (serverResponse) {
        // Server-side redirect
        serverResponse.writeHead(data.redirect.statusCode, {
            Location: data.redirect.url
        });
        serverResponse.end();
        return true;
    } else {
        // Client-side redirect - handled by the page component
        return true;
    }
}

function extractRequestHeaders(
    incomingHeaders: Record<string, string> = {},
    proxyHeaders: string[] = DEFAULT_FETCH_PROXY_HEADERS
): Record<string, string> {
    return Object.fromEntries(
        proxyHeaders
            .map(header => [header.toLowerCase(), incomingHeaders[header.toLowerCase()]])
            .filter(([_, value]) => value !== undefined)
    );
}

function setResponseHeaders(
    response: AxiosResponse,
    serverResponse: ServerResponse,
    passThroughHeaders: string[] = DEFAULT_PASS_THROUGH_HEADERS
): void {
    passThroughHeaders.forEach(header => {
        const value = response.headers[header.toLowerCase()];
        if (value) {
            serverResponse.setHeader(header, value);
        }
    });
}

export async function fetchMenu(
    incomingHeaders?: Record<string, string>,
    serverResponse?: ServerResponse,
    options: {
        proxyHeaders?: string[];
        passThroughHeaders?: string[];
    } = {}
): Promise<MenuItem[]> {
    try {
        const headers = extractRequestHeaders(
            incomingHeaders,
            options.proxyHeaders
        );

        const response = await drupalClient.get<MenuItem[]>('/api/menu_items/main', { headers });
        
        if (serverResponse) {
            setResponseHeaders(response, serverResponse, options.passThroughHeaders);
        }

        return response.data;
    } catch (error) {
        throw handleError(error as AxiosError, serverResponse);
    }
}

export async function fetchPage(
    path: string,
    incomingHeaders?: Record<string, string>,
    serverResponse?: ServerResponse,
    options: {
        proxyHeaders?: string[];
        passThroughHeaders?: string[];
    } = {}
): Promise<PageData> {
    try {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const headers = extractRequestHeaders(
            incomingHeaders,
            options.proxyHeaders
        );

        const response = await drupalClient.get<PageData>(cleanPath, { headers });
        
        if (serverResponse) {
            setResponseHeaders(response, serverResponse, options.passThroughHeaders);
        }

        validateResponse(response.data);

        // Handle redirects
        if (response.data.redirect) {
            const isRedirecting = handleRedirect(response.data, serverResponse);
            if (isRedirecting) {
                return response.data; // Let the page component handle client-side redirects
            }
        }

        response.data.statusCode = response.status;
        return response.data;
    } catch (error) {
        const errorResponse = handleError(error as AxiosError, serverResponse);
        if (errorResponse.data) {
            return errorResponse.data;
        }
        throw errorResponse;
    }
}