import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Clientes.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import { BackIcon, LogoWhatsAppIcon, PencilSolidIcon, TrashIcon } from '@/utils/icons';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '@/graphql/queries';
import Loading from '@/components/Loading';

interface Client {
  id: string;
  cnpj: string;
  corporateName: string;
  tradeName: string;
  city: string;
  state: string;
  email: string;
  whatsapp: string;
  stateRegistration: string;
  address: string;
  numberAddress: string;
  neighborhood: string;
}

const ClientDetails = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState<Client | null>(null);
  const routeName = `Cliente #${id}`;

  const backButtonContent = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <BackIcon /> <p style={{ fontWeight: '700' }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });
  const handleLatestShipmentsButton = (id: string) => {
    router.push(`/ultimos-embarques/${id}`);
  };

  useEffect(() => {
    if (data && data.client) {
      setClient(data.client);
    }
  }, [data]);

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
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.backButtonContainer}>
                <Botao
                  text={backButtonContent}
                  className={styles.backButton}
                  onClick={handleGoBack}
                />
              </div>

              <div className={styles.serviceDetailsContainer}>
                <div className={styles.informations}>
                  <div className={styles.title}>
                    <p>Dados do Cliente</p>
                    <PencilSolidIcon />
                  </div>

                  {loading ?
                    <div className={styles.loadingContainer}>
                      <Loading />
                    </div>
                    : error ? (
                      <p>Erro ao carregar cliente: {error.message}</p>
                    ) : !client ? (
                      <p>Cliente não encontrado</p>
                    ) : (
                      <>
                        <div className={styles.longRow}>
                          <p>
                            Nome: <span>{client.corporateName}</span>
                          </p>
                          <p>
                            CNPJ: <span>{client.cnpj}</span>
                          </p>
                        </div>

                        <div className={styles.row}>
                          <p>
                            Fantasia: <span>{client.tradeName}</span>
                          </p>
                          <div className={styles.whatsappContainer}>
                            <LogoWhatsAppIcon />
                            <p>
                              <span>{client.whatsapp}</span>
                            </p>
                          </div>
                          <p>
                            E-mail: <span>{client.email}</span>
                          </p>
                        </div>

                        <div className={styles.row}>
                          <p>
                            Inscrição Estadual: <span>{client.stateRegistration}</span>
                          </p>
                          <p>
                            Endereço: <span>{client.address}</span>
                          </p>
                          <p>
                            Número: <span>{client.numberAddress}</span>
                          </p>
                          <p>
                            Bairro: <span>{client.neighborhood}</span>
                          </p>
                        </div>

                        <div className={styles.row}>
                          <p>
                            Cidade: <span>{client.city}</span>
                          </p>
                          <p>
                            Estado: <span>{client.state}</span>
                          </p>
                        </div>
                        <div className={styles.title} style={{ marginTop: '32px' }}>
                          <p>Financeiro</p>
                        </div>

                        <div className={styles.row}>
                          <p>Prazo para pagamento: <span>Boleto 15/21 dias</span></p>
                          <p>Consulta feita em: <span>11/10/2023</span></p>
                        </div>

                        <div className={styles.title} style={{ marginTop: '32px', marginBottom: '44px', cursor: 'pointer' }} onClick={() => handleLatestShipmentsButton(client.id)}>
                          <p>Ver últimos embarques</p>
                        </div>

                        <div className={styles.row}>
                          <p>
                            <span>Observações</span>
                          </p>
                        </div>

                        <div className={styles.textContainer}>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Officiis eius, exercitationem iure autem nam quos natus
                            distinctio omnis dignissimos quasi quis asperiores nostrum
                            labore maxime libero sit. Deleniti, voluptas blanditiis!
                          </p>
                        </div>

                        <div className={styles.actionButtonsContainer}>
                          <Botao
                            text="Salvar"
                            onClick={() => console.log('Salvou')}
                            className={styles.btnDark}
                          />
                        </div>

                        <div className={styles.footer}>
                          <p className={styles.dateAndTimeChangeText}>
                            Última alteração feita por: Fulano ABC - 01/04/2024 às
                            10:44
                          </p>
                          <div className={styles.deleteContainer}>
                            <p>Excluir Cadastro</p>
                            <TrashIcon />
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ClientDetails;
