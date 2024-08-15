import React from 'react';
import { useRouter } from 'next/router';
import FreightForm from '../../components/ExampleFreights/FreightForm';

const FreightDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch freight data by ID here
  const freight = null;

  return <FreightForm freight={freight} onSave={() => { }} />;
};

export default FreightDetailPage;
