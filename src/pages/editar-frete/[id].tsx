import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FreightService } from "@/services/freightService";
import { Freight } from "@/utils/types/Freight";

const EditFreight = () => {
  const router = useRouter();
  const { id } = router.query;
  const [freight, setFreight] = useState<Freight | null>(null);

  useEffect(() => {
    if (id) {
      const fetchFreightDetails = async () => {
        const freightData = await FreightService.getFreightById(id as string);
        setFreight(freightData);
      };
      fetchFreightDetails();
    }
  }, [id]);

  if (!freight) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Frete {freight.freightCode}</h1>
      <h3>Id do Frete: {freight.id}</h3>
      <h3>Motorista: {freight.driverName}</h3>
      <h3>Status: {freight.status}</h3>
      <p>{freight.origin} - {freight.destination}</p>
    </div>
  );
};

export default EditFreight;
