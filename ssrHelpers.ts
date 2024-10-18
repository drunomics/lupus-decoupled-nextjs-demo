import { fetchPage, fetchAlias } from "./lib/drupalClient";

export async function getNodePageProps(context: any) {
    const { id } = context.params

    try {
        const nodeData = await fetchPage(id)
        return {
            props: {
                nodeData
            }
        }
    } catch (error) {
        return {
            props: {
                error: (error as Error).message
            }
        }
    }
}

export async function getAliasRedirectProps(context: any) {
    const { alias } = context.params

    try {
        const response = await fetchAlias(alias.join("/"))

        if (response.redirect) {
            return {
                redirect: {
                    destination: response.redirect.url,
                    permanent: false
                }
            }
        }

        return {
            notFound: true
        }

    } catch(error) {
        return {
            props: {
                error: (error as Error).message
            }
        }
    }
}