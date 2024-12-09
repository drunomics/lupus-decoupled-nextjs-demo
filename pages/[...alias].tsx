import Head from "next/head"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { fetchPage } from "../lib/drupalClient"
import Breadcrumbs from "../components/Breadcrumbs"
import Message from "../components/Message"
import DynamicComponent from "../components/DynamicComponent"
import "../app/globals.css"

type ErrorType = {
    statusCode: number;
    message: string;
}

type PageProps = {
    pageData?: {
        title: string;
        metatags?: {
            meta: { name: string; content: string; }[];
            link: { rel: string; href: string; }[];
        };
        messages?: Record<string, any>;
        breadcrumbs?: { text: string; url: string; }[];
        content: {
            element: string;
            [key: string]: any;
        };
        redirect?: {
            url: string;
            statusCode: number;
            external: boolean;
        };
    };
    error?: ErrorType;
}

export default function Page({ pageData, error }: PageProps) {
    const router = useRouter();

    useEffect(() => {
        if (pageData?.redirect) {
            if (pageData.redirect.external) {
                window.location.href = pageData.redirect.url;
            } else {
                router.replace(pageData.redirect.url);
            }
        }
    }, [pageData, router]);

    if (error) return <div>Error loading page: {error.message}</div>;
    if (!pageData) return <div>No data found</div>;
    if (pageData.redirect) return null;

    const titleMeta = pageData.metatags?.meta.find(meta => meta.name === 'title');

    return (
        <div>
            <Head>
                {titleMeta && <title>{titleMeta.content}</title>}
                {pageData.metatags?.meta.map((metaTag, index) => (
                    <meta key={index} name={metaTag.name} content={metaTag.content} />
                ))}

                {pageData.metatags?.link.map((linkTag, index) => (
                    <link key={index} rel={linkTag.rel} href={linkTag.href} />
                ))}
            </Head>

            {!Array.isArray(pageData.messages) && pageData.messages && (
                <Message messages={pageData.messages} />
            )}
            
            {pageData.breadcrumbs && (
                <Breadcrumbs breadcrumbs={pageData.breadcrumbs} />
            )}

            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                {pageData.title}
            </h1>

            <DynamicComponent 
                element={pageData.content.element} 
                content={pageData.content} 
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    const fullPath = context.resolvedUrl;
    
    try {
        const pageData = await fetchPage(
            fullPath,
            context.req.headers,
            context.res
        );

        return {
            props: {
                pageData
            }
        };
    } catch (error) {
        if ('statusCode' in error) {
            return {
                props: {
                    error: {
                        statusCode: error.statusCode,
                        message: error.message
                    }
                }
            };
        }
        
        return {
            props: {
                error: {
                    statusCode: 500,
                    message: 'Internal Server Error'
                }
            }
        };
    }
}