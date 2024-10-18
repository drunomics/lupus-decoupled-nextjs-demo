import { useEffect } from "react";
import { useRouter } from "next/router";

interface AliasRedirectProps {
    redirectUrl: string | null
}

export const AliasRedirect = ({ redirectUrl }: AliasRedirectProps) => {
    const router = useRouter()

    useEffect(() => {
        if (redirectUrl) {
            router.push(redirectUrl)
        }
    }, [redirectUrl])

    return null
}