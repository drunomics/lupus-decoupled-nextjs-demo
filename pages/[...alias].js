import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { redirectMockData } from '../mockData';

export default function AliasRedirectPage() {
    
  const router = useRouter();
  const { alias } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!alias) return;

    const fetchRedirect = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${alias.join('/')}`);
        // const response = redirectMockData
        if (response.redirect) {
          const redirectUrl = response.redirect.url;
          router.push(redirectUrl);
        }
      } catch (error) {
        setError('Error fetching alias: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRedirect();
  }, [alias, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return null;
}