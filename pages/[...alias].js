import Head from "next/head"
import { fetchPage } from "../lib/drupalClient"
import Breadcrumbs from "../components/Breadcrumbs"
import Message from "../components/Message"
import DynamicComponent from "../components/DynamicComponent"
import "../app/globals.css"

export default function Page({ pageData, error }) {
    if (error) return <div>Error loading page: {error}</div>
    if (!pageData) return <div>No data found</div>

    return (
        <div>
            <Head>
                {pageData.metatags.meta.map((metaTag, index) => (
                    <meta key={index} name={metaTag.name} content={metaTag.content} />
                ))}

                {pageData.metatags.link.map((linkTag, index) => (
                    <link key={index} rel={linkTag.rel} href={linkTag.href} />
                ))}
            </Head>
            
            {!Array.isArray(pageData.messages) && pageData.messages && (
                <Message messages={pageData.messages} />
            )}
            
            <Breadcrumbs breadcrumbs={pageData.breadcrumbs} />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                {pageData.title}
            </h1>
            <DynamicComponent 
                element={pageData.content.element} 
                content={pageData.content} 
            />
        </div>
    )
}

export async function getServerSideProps(context) {
    const fullPath = context.resolvedUrl // Keep the full URL including query parameters
    
    try {
        const pageData = await fetchPage(fullPath)

        if (!pageData) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                pageData
            }
        }
    } catch (error) {
        return {
            props: {
                error: error.message
            }
        }
    }
}