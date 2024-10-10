import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchPage } from "../../lib/drupalClient"

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
            setNodeData(response)
            
            } catch (err) {
                setError(err)
                console.log('Error fecthing data:', err)
            }
        }

        fetchNodeData()
    }, [id])

    if (error) return <div>Error loading node: {error.message}</div>
    if (!nodeData) return <div>No data found</div>

    return (
        <div>
            <h1>{nodeData.title}</h1>
        </div>
    )
}