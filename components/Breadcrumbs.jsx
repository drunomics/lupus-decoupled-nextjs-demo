import Link from "next/link";

export default function Breadcrumbs({ breadcrumbs }) {
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return null
    }

    return (
        <nav aria-label="breadcrumb" className="my-6 mx-4">
            <ol className="flex list-none space-x-2">
                {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex items-center text-blue-600">
                        <Link href={item.url}>
                            {item.label}
                        </Link>
                        {index < breadcrumbs.length - 1 && (
                            <span className="mx-2 text-gray-500">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}