import Breadcrumbs from "./Breadcrumbs";
import DynamicComponent from "./DynamicComponent";

interface NodePageProps {
    nodeData: {
        breadcrumbs: [],
        title: string,
        content: {
            element: string
        }
    }
}

export const NodePage = ({ nodeData }: NodePageProps) => {
    if (!nodeData) return <div>No data found</div>

    return (
        <div>
            <Breadcrumbs breadcrumbs={nodeData.breadcrumbs} />
            <h1>{nodeData.title}</h1>
            <DynamicComponent element={nodeData.content.element} content={nodeData.content} />
        </div>
    )
}