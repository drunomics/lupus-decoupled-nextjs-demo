export default function NodeArticleFull({ content }) {
    const { title, uid} = content
    return (
        <div>
            <p className="text-xl">Title: <span className="text-base">{title}</span></p>
            <p className="text-xl">node id: <span className="text-base">{uid}</span></p>
        </div>
    )
}