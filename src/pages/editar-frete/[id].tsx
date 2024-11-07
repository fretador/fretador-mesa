import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import styles from './EditarFrete.module.css'
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/store/store";
import Header from "@/components/Header";
import Body from "@/components/Body";
import FormContainer from "@/components/FormContainer";
import { useQuery } from '@apollo/client';
import { GET_FREIGHT_BY_ID } from '@/graphql/queries/freightQueries';
import Loading from "@/components/Loading";

const EditFreight = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_FREIGHT_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network"
  });

  const freight = data?.freight;

  // Mapeamos os dados do frete para o formato esperado pelo FormContainer
  const initialData = {
    pickupDeliveryData: freight.pickupDeliveryData,
    origin: freight.origin,
    destination: freight.destination,
    cargoLoadType: freight.cargoLoadType,
    needsTarp: freight.needsTarp,
    needsTracker: freight.needsTracker,
    product: freight.product,
    cargoType: freight.cargoType,
    totalWeight: freight.totalWeight,
    volumes: freight.volumes,
    cubage: freight.cubage,
    moreDetails: freight.moreDetails,
    eligibleVehicles: freight.eligibleVehicles,
    eligibleBodyworks: freight.eligibleBodyworks,
    type: freight.type,
    pedagioIncluso: freight.pedagioIncluso,
    formaPagamento: freight.formaPagamento,
    observations: freight.observations,
  };
  // Exibimos os dados do frete para verificação
  console.log("Initial data: ", initialData);

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
              {loading ?
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
                : error ? (
                  <p>Erro ao carregar frete: {error.message}</p>
                ) : !freight ? (
                  <p>Frete não encontrado</p>
                ) : (
                  <FormContainer
                    showFreightSubmissionButton={false}
                    showEditFreightButton={true}
                    initialData={initialData}
                  />
                )}
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default EditFreight;
