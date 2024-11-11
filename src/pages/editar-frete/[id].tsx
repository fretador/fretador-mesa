import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import styles from './EditarFrete.module.css';
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/store/store";
import Header from "@/components/Header";
import Body from "@/components/Body";
import { useQuery, useMutation } from '@apollo/client';
import { GET_FREIGHT_BY_ID } from '@/graphql/queries/freightQueries';
import { UPDATE_FREIGHT } from '@/graphql/mutations/freightMutations';
import { UpdateFreightInput } from "@/utils/types/UpdateFreightInput";
import EditFreightForm from "@/components/EditFreightForm";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const EditFreight = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_FREIGHT_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  const [updateFreight, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_FREIGHT);

  const [initialData, setInitialData] = useState<UpdateFreightInput | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(null);

  useEffect(() => {
    if (data?.freight) {
      const freight = data.freight;
      setInitialData({
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
        paymentType: freight.paymentType,
        observations: freight.observations,
      });
    }
  }, [data]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar o frete</div>;
  }

  const handleUpdateFreight = async (updatedData: UpdateFreightInput) => {
    console.log("Updated Data:", updatedData);
    try {
      const response = await updateFreight({
        variables: {
          id,
          input: updatedData,
        },
      });

      const updatedFreight = response.data.updateFreight;
      setInitialData(updatedFreight);

      alert("Frete atualizado com sucesso!");

    } catch (error) {
      console.error("Erro ao atualizar o frete:", error);
      alert("Erro ao atualizar o frete. Tente novamente.");
    }
  };

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
              {initialData && (
                <EditFreightForm
                  initialData={initialData}
                  submit={handleUpdateFreight}
                />
              )}
              {mutationLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingOverlayItems}>
                    <Loading />
                    <p>Atualizando Frete</p>
                  </div>
                </div>
              )}
              {mutationError && (
                <div className={styles.messageContainer}>
                  <div className={`${styles.message} ${styles.error}`}>
                    Erro ao atualizar o frete.
                  </div>
                </div>
              )}
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default EditFreight;
