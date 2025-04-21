// pages/[id].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DynamicPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      router.push(`/?id=${id}`, `/?id=${id}`, { shallow: true });
    }
  }, [id, router]);

  return null;
};

export default DynamicPage;