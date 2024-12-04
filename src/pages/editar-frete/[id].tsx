import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import styles from './EditarFrete.module.css';
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/store/store";
import Header from "@/components/Header";
import Body from "@/components/Body";
import { UpdateFreightInput } from "@/utils/Interfaces/UpdateFreightInput";
import EditFreightForm from "@/components/EditFreightForm";
import { useEffect, useState } from "react";
import { useFreightById } from "@/hooks/freight/useFreightById";
import { useUpdateFreight } from "@/hooks/freight/useUpdateFreight";
import { Freight } from "@/utils/Interfaces/Freight";
import SmallLoading from "@/components/SmallLoading";

const EditFreight = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const boardUser = useAppSelector((state) => state.auth.boardUser);
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, refetch } = useFreightById(id as string);
  const { updateFreight } = useUpdateFreight();
  const [initialData, setInitialData] = useState<Freight | null>(null);

  useEffect(() => {
    if (data) {
      const freight = data;
      setInitialData({
        ...freight
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
      await updateFreight({
        variables: {
          id: id as string,
          input: { ...updatedData, boardUser: { name: boardUser?.name, profile: boardUser?.profile } },
        },
      });

      alert("Frete atualizado com sucesso!");
      refetch();
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
              {loading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingOverlayItems}>
                    <SmallLoading />
                    <p>Atualizando Frete</p>
                  </div>
                </div>
              )}
              {error && (
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
