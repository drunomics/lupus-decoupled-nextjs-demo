import { redirectMockData } from "../mockData";

export default function AliasRedirectPage() {
  return null
}

export async function getServerSideProps(context) {
  const { alias } = context.params

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${alias.join('/')}`);
    // const response = redirectMockData

    if (response.redirect) {
      const redirectUrl = response.redirect.url

      return {
        redirect: {
          destination: redirectUrl,
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
        error: error.message
      }
    }
  }
}