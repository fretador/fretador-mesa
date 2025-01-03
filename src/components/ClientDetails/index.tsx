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

  // States para edição de dados do Motorista
  const [isClientEditing, setIsClientEditing] = useState(false);
  const [editableClient, setEditableClient] = useState({
    corporateName: '',
    tradeName: '',
    whatsapp: '',
    email: '',
    stateRegistration: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''

  });

  useEffect(() => {
    if (client) {
      setEditableClient({
        corporateName: client.corporateName,
        tradeName: client.tradeName,
        whatsapp: client.whatsapp,
        email: client.email,
        stateRegistration: client.stateRegistration,
        address: client.address,
        number: client.numberAddress,
        neighborhood: client.neighborhood,
        city: client.city,
        state: client.state
      });
    }
  }, [client]);

  const handleClientEditToggle = () => {
    setIsClientEditing(!isClientEditing);
  };

  const handleClientInputChange = (field: string, value: string) => {
    setEditableClient((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.informations}>
      <div className={styles.title}>
        <p>Dados do Cliente</p>
        <div
          className={styles.pencilIcon}
          onClick={handleClientEditToggle}
        >
          <PencilSolidIcon fill={isClientEditing ? "#A33830" : '#1A556D'} />
        </div>
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
                Nome:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.corporateName}
                    onChange={(e) => handleClientInputChange("corporateName", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.corporateName}</span>
                )}
              </p>
              <p>
                CNPJ: <span>{client.cnpj}</span>
              </p>
            </div>

            <div className={styles.row}>
              <p>
                Fantasia:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.tradeName}
                    onChange={(e) => handleClientInputChange("tradeName", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.tradeName}</span>
                )}
              </p>
              <div className={styles.whatsappContainer}>
                <div>
                  <LogoWhatsAppIcon />
                </div>
                <p>
                  {isClientEditing ? (
                    <input
                      type="text"
                      value={editableClient.whatsapp}
                      onChange={(e) => handleClientInputChange("whatsapp", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                      onBlur={() => setIsClientEditing(false)}
                      className={styles.editInput}
                    />
                  ) : (
                    <span>{editableClient.whatsapp}</span>
                  )}
                </p>
              </div>
              <p>
                Email:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.email}
                    onChange={(e) => handleClientInputChange("email", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.email}</span>
                )}
              </p>
            </div>

            <div className={styles.row}>
              <p>
                Inscrição Estadual:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.stateRegistration}
                    onChange={(e) => handleClientInputChange("stateRegistration", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.stateRegistration}</span>
                )}
              </p>
              <p>
                Endereço:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.address}
                    onChange={(e) => handleClientInputChange("address", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.address}</span>
                )}
              </p>
              <p>
                Número:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.number}
                    onChange={(e) => handleClientInputChange("number", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.number}</span>
                )}
              </p>
              <p>
                Bairro:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.neighborhood}
                    onChange={(e) => handleClientInputChange("neighborhood", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.neighborhood}</span>
                )}
              </p>
            </div>

            <div className={styles.row}>
              <p>
                Cidade:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.city}
                    onChange={(e) => handleClientInputChange("city", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.city}</span>
                )}
              </p>
              <p>
                Estado:{" "}
                {isClientEditing ? (
                  <input
                    type="text"
                    value={editableClient.state}
                    onChange={(e) => handleClientInputChange("state", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsClientEditing(false)}
                    onBlur={() => setIsClientEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableClient.state}</span>
                )}
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
