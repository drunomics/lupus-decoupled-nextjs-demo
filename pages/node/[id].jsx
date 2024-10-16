import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchPage, fetchMenu } from "../../lib/drupalClient"
import Breadcrumbs from "../../components/Breadcrumbs";
import DynamicComponent from "../../components/DynamicComponent";
import { mockData, mockData2 } from "../../mockData";

export default function NodePage() {
    const router = useRouter()
    const { id } = router.query
    const [nodeData, setNodeData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return

        const fetchNodeData = async () => {
            try {
            const response = await fetchPage(id)
            console.log('response: ', response)
            setNodeData(mockData2)
            
            } catch (err) {
                setError(err)
                console.log('Error fecthing data:', err)
            }
        }

        fetchNodeData()
    }, [id])

    useEffect(() => {
        const nodeFetchMenu = async () => {
            try {
            const response = await fetchMenu()
            setNodeData(response)
            
            } catch (err) {
                setError(err)
                console.log('Error fecthing data:', err)
            }
        }

        // nodeFetchMenu()
    }, [])

    if (error) return <div>Error loading node: {error.message}</div>
    if (!nodeData) return <div>No data found</div>

    return (
        <div>
            <Breadcrumbs breadcrumbs={nodeData.breadcrumbs} />
            <h1>{nodeData.title}</h1>
            <DynamicComponent element={nodeData.content.element} content={nodeData.content}/>
        </div>
    )
}