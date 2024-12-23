import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './ClientData.module.css';
import Botao from '@/components/Botao';
import { LogoWhatsAppIcon, PencilSolidIcon, TrashIcon } from '@/utils/icons';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '@/graphql/queries';
import SmallLoading from '@/components/SmallLoading';

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

interface ClientDataProps {
  handleLatestShipmentsButton: () => void
}

const ClientData = ({handleLatestShipmentsButton}: ClientDataProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState<Client | null>(null);

  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data && data.client) {
      setClient(data.client);
    }
  }, [data]);

  return (
    <div className={styles.informations}>
      <div className={styles.title}>
        <p>Dados do Cliente</p>
        <PencilSolidIcon />
      </div>

      {loading ?
        <div className={styles.loadingContainer}>
          <SmallLoading />
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

            <div className={styles.title} style={{ marginTop: '32px', marginBottom: '44px', cursor: 'pointer' }} onClick={handleLatestShipmentsButton}>
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
  );
};

export default ClientData;
