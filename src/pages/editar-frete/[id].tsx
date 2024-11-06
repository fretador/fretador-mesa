import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FreightService } from "@/services/freightService";
import { Freight } from "@/utils/types/Freight";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import styles from './EditarFrete.module.css'
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/store/store";
import Header from "@/components/Header";
import Body from "@/components/Body";
import FormContainer from "@/components/FormContainer";
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";
import { Type } from "@/utils/enums/typeEnum";
import { VehicleType } from "@/utils/types/Enums";
import { BodyworkCategory, BodyworkType } from "@/utils/enums/bodyworkEnums";
import { CargoType } from "@/utils/enums/cargoTypeEnum";
import { VehicleCategory } from "@/utils/enums/vehicleEnums";

const EditFreight = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [freight, setFreight] = useState<Freight | null>(null);

  useEffect(() => {
    if (id) {
      const fetchFreightDetails = async () => {
        const freightData = await FreightService.getFreightById(id as string);
        setFreight(freightData);
        console.log('frete', freightData)
      };
      fetchFreightDetails();
    }
  }, [id]);

  if (!freight) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>

        <div
          className={
            isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
          }
        >
          <div className={styles.header}>
            <Header title={"Editar Frete"} />
          </div>
          <div className={styles.content}>
            <Body>
              <FormContainer
                showFreightSubmissionButton={false}
                showEditFreightButton={true}
                initialData={{
                  pickupDeliveryData: "2023-10-10",
                  origin: 'São Paulo - SP',
                  destination: "Rio de Janeiro - RJ",
                  cargoLoadType: CargoLoadType.PARTIAL,
                  needsTarp: true,
                  needsTracker: true,
                  product: "Areia",
                  cargoType: CargoType.FRACIONADA,
                  totalWeight: 2000,
                  volumes: 200,
                  cubage: 300,
                  moreDetails: "Cuidado pra não tombar. Vai ser difícil carregar novamente",
                  eligibleVehicles: [
                    {
                      category: VehicleCategory.PESADO,
                      type: VehicleType.CARRETA,
                      eligible: true,
                    }
                  ],
                  eligibleBodyworks: [{
                    category: BodyworkCategory.ABERTA,
                    type: BodyworkType.GRADE_BAIXA,
                    eligible: true
                  }],
                  type: Type.OFFER,
                  pedagioIncluso: true,
                  formaPagamento: "Pix",
                  observations: "Reforçar nunca é demais: cuidado pra não tombar. Vai ser difícil carregar novamente"
                }}
              />
            </Body>
          </div>
          <div>
            <p>{freight.origin}</p>
            <p>{freight.destination}</p>
            <p>{freight.eligibleVehicles}</p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default EditFreight;
