import Head from "next/head"
import { fetchPage } from "../../lib/drupalClient"
import Breadcrumbs from "../../components/Breadcrumbs"
import DynamicComponent from "../../components/DynamicComponent"
import { mockData, mockData2 } from "../../mockData"

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
            <Breadcrumbs breadcrumbs={nodeData.breadcrumbs} />
            <h1>{nodeData.title}</h1>
            <DynamicComponent element={nodeData.content.element} content={nodeData.content} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params

    try {
        const nodeData = await fetchPage(id)
        // const nodeData = mockData2

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