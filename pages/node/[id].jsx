import { fetchPage } from "../../lib/drupalClient"
import Breadcrumbs from "../../components/Breadcrumbs"
import DynamicComponent from "../../components/DynamicComponent"
import { mockData, mockData2 } from "../../mockData" 

export default function NodePage({ nodeData, error }) {
    if (error) return <div>Error loading node: {error}</div>
    if (!nodeData) return <div>No data found</div>

    return (
        <div>
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
    } catch(error) {
        return {
            props: {
                error: error.message
            }
        }
    }
}