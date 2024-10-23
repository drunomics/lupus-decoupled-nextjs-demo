export default function NodeArticleFull({ content }) {
    const { title, uid} = content
    return (
        <div>
            <p>Title: {title}</p>
            <span>node id: {uid}</span>
        </div>
    )
}