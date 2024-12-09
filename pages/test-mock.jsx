import Head from "next/head"
import { fetchPage } from "../lib/drupalClient"
import Breadcrumbs from "../components/Breadcrumbs"
import Message from "../components/Message"
import DynamicComponent from "../components/DynamicComponent"
import { mockData, mockData2 } from "../mockData"
import "../app/globals.css"

export default function NodePage({ nodeData, error }) {
    if (error) return <div>Error loading node: {error}</div>
    if (!nodeData) return <div>No data found</div>

    return (
        <div>
            <Head>
                {
                    nodeData.metatags.meta.map((metaTag, index) => (
                        <meta key={index} name={metaTag.name} content={metaTag.content} />
                    ))
                }

                {nodeData.metatags.link.map((linkTag, index) => (
                    <link key={index} rel={linkTag.rel} href={linkTag.href} />
                ))}
            </Head>
            {!Array.isArray(nodeData.messages) && nodeData.messages && <Message messages={nodeData.messages} />}
            
            <Breadcrumbs breadcrumbs={nodeData.breadcrumbs} />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">{nodeData.title}</h1>
            <DynamicComponent element={nodeData.content.element} content={nodeData.content} />
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const nodeData = mockData2

        if (!nodeData) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                nodeData
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