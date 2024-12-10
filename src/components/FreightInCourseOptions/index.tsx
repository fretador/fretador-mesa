import React, { useRef, useState } from "react";
import { useAppSelector } from "@/store/store";
import styles from "./FreightInCourseOptions.module.css";
import { useDocumentController } from "@/controllers/documentController";
import {
  CheckFillIcon,
  DangerIcon,
  PaperClipIcon,
  WhatsAppIcon,
} from "@/utils/icons";
import Modal from "@/components/Modal";
import SmallLoading from "@/components/SmallLoading";
import DocumentSentModal from "@/components/ModalRoot/DocumentSentModal";
import DocumentTypeModal from "@/components/ModalRoot/DocumentTypeModal";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { getNextStatus } from "@/utils/freightStatusHelpers";
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";
import { useUpdateStatusFreight } from "@/hooks/freight/useUpdateStatusFreight";
import { useUpdateFreight } from "@/hooks/freight/useUpdateFreight";

import ProvidePaymentDetails from "@/components/Modal/FreteEmCurso/ProvidePaymentDetails";
import TravelWithoutPayment from "@/components/Modal/FreteEmCurso/TravelWithoutPayment";
import ProvideFreightValue from "@/components/Modal/FreteEmCurso/ProvideFreightValue";

interface FreightInCourseOptionsProps {
  freightId: string;
  currentStatus: FreightStatus;
  actionButtonText: string;
  actionButtonStatus: FreightStatus | null;
  value?: number;
  advanceValue?: number;
  balanceValue?: number;
}

/**
 * Este componente controla as opções de ação durante o curso do frete.
 * Ele gerencia a exibição de diversos modais, o envio de documentos,
 * a transição entre status do frete e a interação com o usuário.
 *
 * Fluxos principais:
 * - Dependendo do status atual e do próximo status (actionButtonStatus),
 *   diferentes modais de confirmação ou solicitação de informações são exibidos.
 * - Ao confirmar ações, o status do frete pode avançar.
 * - Em casos específicos, o usuário é solicitado a informar valores de pagamento
 *   ou decidir se quer continuar sem informar (resultando na abertura de outros modais).
 * - Toda a lógica de qual modal abrir está centralizada no objeto modalMapping.
 */

const FreightInCourseOptions: React.FC<FreightInCourseOptionsProps> = ({
  freightId,
  currentStatus,
  actionButtonText,
  actionButtonStatus,
  value,
  advanceValue,
  balanceValue,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocuments } = useDocumentController();

  // Estado de arquivos selecionados no input de documentos
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Controle de estado para modais gerais
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);

  // Estados de carregamento (upload/ação)
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Configuração do modal principal (dinâmico), usado pelo modalMapping
  const [modalConfig, setModalConfig] = useState<{
    isVisible: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
  } | null>(null);

  const boardUser = useAppSelector((state) => state.auth.boardUser);
  const { updateStatusFreight } = useUpdateStatusFreight(freightId);
  const { updateFreight } = useUpdateFreight(freightId);

  // ----- Estados para fluxos específicos -----
  // Modal para informar pagamento após liberar viagem
  const [showProvidePaymentDetails, setShowProvidePaymentDetails] = useState(false);

  // Modal para perguntar se continua sem informar valores ou não
  const [showNoPaymentNowModal, setShowNoPaymentNowModal] = useState(false);

  // Modal para viagem sem pagamento
  const [showTravelWithoutPayment, setShowTravelWithoutPayment] = useState(false);

  // Modal "Informar pagamento" após solicitar comprovantes
  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false);

  // Modal "ProvideFreightValue" após "Solicitar saldo"
  const [showProvideFreightValue, setShowProvideFreightValue] = useState(false);

  /**
   * Atualiza o status do frete chamando a mutation GraphQL.
   * Caso ocorra erro, exibe um alerta.
   */
  const handleAction = async (newStatus: FreightStatus) => {
    setIsActionLoading(true);
    try {
      await updateStatusFreight({
        variables: {
          id: freightId as string,
          input: {
            status: newStatus,
            updateData: {
              boardUser: { name: boardUser?.name, profile: boardUser?.profile },
            },
            updateDataType: UpdateDataTypeEnum.STATUS,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar o status do frete:", error);
      alert("Erro ao atualizar o status do frete.");
    } finally {
      setIsActionLoading(false);
    }
  };

  /**
   * Atualiza os valores do frete informados nos modais
   */
  const handleUpdateFreightValues = async (newValues: {
    value?: number;
    advanceValue?: number;
    balanceValue?: number
  }) => {
    try {
      await updateFreight({
        variables: {
          id: freightId,
          input: {
            ...newValues,
            boardUser: { name: boardUser?.name, profile: boardUser?.profile },
          },
        },
      });
      return true; // Atualização foi bem sucedida
    } catch (error) {
      console.error("Erro ao atualizar valores do frete:", error);
      alert("Ocorreu um erro ao atualizar os valores do frete. Por favor, tente novamente.");
      return false; // Falha na atualização
    }
  };

  /**
   * Abre o seletor de arquivos para anexar documentos se não estiver em loading.
   */
  const handleAttachDocuments = () => {
    if (!isLoading && !isActionLoading) {
      fileInputRef.current?.click();
    }
  };

  /**
   * Handler chamado quando o usuário seleciona arquivos no input.
   * Limita a 3 documentos e abre o modal de tipo de documentos.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(event.target.files || []);

    if (files.length > 3) {
      alert("Você pode selecionar no máximo 3 documentos por vez.");
      files = files.slice(0, 3);
    }

    setSelectedFiles(files);
    setShowTypeModal(true);
  };

  /**
   * Ao enviar documentos com tipo selecionado, atualiza o status para o próximo.
   * Caso não haja próximo status, usa PICKUP_ORDER_SENT como fallback.
   * Faz upload e chama a mutation para atualizar o frete.
   */
  const handleTypeModalSubmit = async (
    filesWithTypes: { file: File; type: string }[]
  ) => {
    try {
      setIsLoading(true);

      // Renomeia arquivos de acordo com o tipo selecionado
      const modifiedFiles = filesWithTypes.map(({ file, type }) => {
        const newName = `${type}_${file.name}`;
        return new File([file], newName, { type: file.type });
      });

      const dataTransfer = new DataTransfer();
      modifiedFiles.forEach((file) => dataTransfer.items.add(file));
      const newFileList = dataTransfer.files;

      const newEvent = {
        target: {
          files: newFileList,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      const uploadedFiles = await uploadDocuments(newEvent);
      console.log("uploadedFiles", uploadedFiles);

      // Determina o próximo status dinamicamente
      const nextDynamicStatus = getNextStatus(currentStatus);
      const newstatus = nextDynamicStatus ?? FreightStatus.PICKUP_ORDER_SENT;

      const updateData = modifiedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));
      const updateDataType = UpdateDataTypeEnum.DOCUMENT;

      // Atualiza o status do frete com os documentos anexados
      await updateStatusFreight({
        variables: {
          id: freightId as string,
          input: {
            status: newstatus,
            updateData: {
              documents: [...updateData],
              boardUser: { name: boardUser?.name, profile: boardUser?.profile },
            },
            updateDataType: updateDataType,
          },
        },
      });

      setIsLoading(false);
      setShowTypeModal(false);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao processar os documentos:", error);
      alert("Ocorreu um erro ao processar os documentos. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };

  /**
   * Fecha o modal de tipo de documento e exibe o modal de documentos enviados.
   */
  const handleCloseTypeModal = () => {
    setShowTypeModal(false);
    setShowModal(true);
    setIsLoading(false);
  };

  /**
   * Dispara alerta (log de exemplo).
   */
  const handleSendAlert = () => {
    console.log("Enviou alerta");
  };

  /**
   * Interage com o motorista (log de exemplo).
   */
  const handleTalkToDriver = () => {
    console.log("Falou com o motorista");
  };

  /**
   * Fecha o modal de documentos enviados.
   */
  const closeModal = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };

  /**
   * Mapeamento entre status e a ação/modal a ser exibida.
   * Cada entrada do objeto define o modal a ser exibido e a ação "onConfirm".
   * Se o usuário clicar no botão principal (confirm), executa onConfirm.
   * Em alguns casos, chama handleAction para avançar o status.
   */
  const modalMapping: { [key in FreightStatus]?: () => void } = {
    [FreightStatus.APPROVED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Autorizar Embarque",
        description: "Confirma a autorização do motorista para dar início ao frete?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          handleAction(actionButtonStatus!);
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.ACCEPTED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Aceitar Frete",
        description: "Você confirma a aceitação deste frete?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          handleAction(actionButtonStatus!);
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.INVOICE_SENT]: () => {
      setModalConfig({
        isVisible: true,
        title: "Autorizar Embarque",
        description: "Por favor envie a ordem de coleta no: Anexar Documentos.",
        confirmText: "Enviar",
        cancelText: "Cancelar",
        onConfirm: () => {
          handleAttachDocuments();
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.PICKUP_ORDER_SENT]: () => {
      setModalConfig({
        isVisible: true,
        title: "Autorizar Embarque",
        description: "Por favor envie a ordem de coleta no: Anexar Documentos.",
        confirmText: "Enviar",
        cancelText: "Cancelar",
        onConfirm: () => {
          handleAttachDocuments();
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.LOADING_STARTED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Carregar carga",
        description: "Confirma o início do carregamento do veículo?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          handleAction(actionButtonStatus!);
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.LOADING_FINISHED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Carregar carga",
        description: "Ao completar o carregamento envie o CTE e o Manifesto no Anexar documentos.",
        confirmText: "Enviar",
        cancelText: "Cancelar",
        onConfirm: () => {
          handleAttachDocuments();
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.ROUTE_IN_PROGRESS]: () => {
      setModalConfig({
        isVisible: true,
        title: "Em rota",
        description: "Confirma a liberação do motorista para dar início a viagem?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          setModalConfig(null);

          // Verifica se já temos todos os valores: value, advanceValue e balanceValue
          if (value !== undefined && advanceValue !== undefined && balanceValue !== undefined) {
            // Todos os valores já informados, avança diretamente
            handleAction(actionButtonStatus!);
          } else {
          // Exibe o modal para informar valores
            setShowProvidePaymentDetails(true);
          }
        },
      });
    },
    [FreightStatus.DRIVER_ARRIVED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Chegada no destino",
        description: "Confirma a chegada no motorista no local do desembarque?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          handleAction(actionButtonStatus!);
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.INVOICE_COUPON_SENT]: () => {
      setModalConfig({
        isVisible: true,
        title: "Solicitar comprovantes",
        description: "Gostaria de solicitar os comprovantes de entrega ao motorista?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          // Ao clicar em "Sim", abrimos o modal de solicitar pagamento
          setModalConfig(null);
          setShowRequestPaymentModal(true);
        },
      });
    },
    [FreightStatus.FINANCIAL_REQUIRED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Solicitar saldo",
        description:
          "Gostaria de solicitar ao financeiro saldo de frete?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          setModalConfig(null);
          // Verifica apenas se já existe o valor total (value)
          if (value !== undefined) {
            // Já existe valor total do frete, avança diretamente
            handleAction(actionButtonStatus!);
          } else {
          // Exibe modal para informar valor total do frete
            setShowProvideFreightValue(true);
          }
        },
      });
    },
  };

  /**
   * Ao clicar no botão de ação principal, verifica se existe algum modal para o próximo status.
   * Se existir, exibe o modal correspondente. Caso contrário, apenas avança o status.
   */
  const handleActionClick = () => {
    if (isActionLoading) return;

    if (actionButtonStatus && modalMapping[actionButtonStatus]) {
      modalMapping[actionButtonStatus]!();
    } else if (actionButtonStatus) {
      handleAction(actionButtonStatus);
    }
  };

  return (
    <div className={styles.container}>
      {/* Input escondido para anexar documentos */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      {/* Botão para anexar documentos */}
      <div
        className={styles.iconContainer}
        onClick={handleAttachDocuments}
        style={{
          cursor: isLoading || isActionLoading ? "not-allowed" : "pointer",
        }}
      >
        <PaperClipIcon />
        <p>Anexar Documentos</p>
      </div>

      {/* Botão de ação principal (depende do status) */}
      {actionButtonStatus ? (
        <div
          className={styles.iconContainer}
          onClick={handleActionClick}
          style={{ cursor: isActionLoading ? "not-allowed" : "pointer" }}
        >
          {isActionLoading ? (
            <SmallLoading />
          ) : (
            <>
                <CheckFillIcon />
                <p>{actionButtonText}</p>
            </>
          )}
        </div>
      ) : (
        <div className={styles.iconContainer}>
          <CheckFillIcon />
          <p>{actionButtonText}</p>
        </div>
      )}

      {/* Botão para enviar alertas */}
      <div className={styles.iconContainer} onClick={handleSendAlert}>
        <DangerIcon />
        <p>Enviar Alertas</p>
      </div>

      {/* Botão para falar com o motorista */}
      <div className={styles.iconContainer} onClick={handleTalkToDriver}>
        <WhatsAppIcon />
        <p>Falar Com Motorista</p>
      </div>

      {/* Modal que confirma envio de documentos */}
      <DocumentSentModal isOpen={showModal} onClose={closeModal} />

      {/* Modal para seleção do tipo de documentos anexados */}
      {showTypeModal && (
        <DocumentTypeModal
          isOpen={showTypeModal}
          files={selectedFiles}
          onClose={handleCloseTypeModal}
          onSubmit={handleTypeModalSubmit}
          isLoading={isLoading}
        />
      )}

      {/* Modal dinâmico principal, controlado por modalMapping */}
      {modalConfig && (
        <Modal
          isOpen={modalConfig.isVisible}
          onRequestClose={() => setModalConfig(null)}
          modalTitle={modalConfig.title}
          modalDescription={modalConfig.description}
          hasTwoButtons={true}
          buttonOneTitle={modalConfig.confirmText}
          buttonOneAction={modalConfig.onConfirm}
          buttonTwoTitle={modalConfig.cancelText}
          buttonTwoAction={() => setModalConfig(null)}
        />
      )}

      {/* Modal para informar detalhes de pagamento após liberar a viagem */}
      <ProvidePaymentDetails
        isOpen={showProvidePaymentDetails}
        onRequestClose={() => setShowProvidePaymentDetails(false)}
        handleConfirm={async (newTotal: number, newAdvance: number, newBalance: number) => {
          // Ao confirmar valores, atualiza o frete
          const success = await handleUpdateFreightValues({
            value: newTotal,
            advanceValue: newAdvance,
            balanceValue: newBalance
          });

          if (success) {
            setShowProvidePaymentDetails(false);
            handleAction(actionButtonStatus!);
          } else {
            // Caso de erro: não avança o status.
            // Aqui você pode manter o modal aberto, permitir nova tentativa ou simplesmente fechar.
            // Nesse exemplo, deixaremos o modal aberto para permitir nova tentativa.
          }
        }}
        handleCancel={() => {
          // Ao clicar em "Agora não" abre o modal NoPaymentNowModal
          setShowProvidePaymentDetails(false);
          setShowNoPaymentNowModal(true);
        }}
      />

      {/* Modal para escolher entre continuar sem informar valores ou voltar a informar */}
      {showNoPaymentNowModal && (
        <Modal
          isOpen={showNoPaymentNowModal}
          onRequestClose={() => setShowNoPaymentNowModal(false)}
          modalTitle="Continuar sem informar valores?"
          modalDescription="Você deseja continuar sem informar os valores agora, ou informar os valores?"
          hasTwoButtons={true}
          buttonOneTitle="Continuar"
          buttonOneAction={() => {
            setShowNoPaymentNowModal(false);
            setShowTravelWithoutPayment(true);
          }}
          buttonTwoTitle="Informar valores"
          buttonTwoAction={() => {
            setShowNoPaymentNowModal(false);
            setShowProvidePaymentDetails(true);
          }}
        />
      )}

      {/* Modal para viagem sem pagamento, ao confirmar avança o status */}
      <TravelWithoutPayment
        isOpen={showTravelWithoutPayment}
        onRequestClose={() => setShowTravelWithoutPayment(false)}
        // Ajustamos handleConfirm para receber o motivo (reason)
        handleConfirm={async (reason: string) => {
          // Atualiza o frete com o motivo
          try {
            await updateFreight({
              variables: {
                id: freightId,
                input: {
                  noPaymentReason: reason,
                  boardUser: { name: boardUser?.name, profile: boardUser?.profile },
                },
              },
            });

            // Se deu certo, avança o status
            handleAction(actionButtonStatus!);
            setShowTravelWithoutPayment(false);
          } catch (error) {
            console.error("Erro ao atualizar motivo:", error);
            alert("Erro ao atualizar o motivo. Por favor, tente novamente.");
            // Não avança o status em caso de erro
          }
        }}
        handleCancel={() => setShowTravelWithoutPayment(false)}
      />

      {/* Modal exibido após solicitar comprovantes, perguntando se quer solicitar pagamento agora */}
      {showRequestPaymentModal && (
        <Modal
          isOpen={showRequestPaymentModal}
          onRequestClose={() => setShowRequestPaymentModal(false)}
          modalTitle="Informar pagamento"
          modalDescription="Gostaria de solicitar agora o pagamento do motorista?"
          hasTwoButtons={true}
          buttonOneTitle="Sim"
          buttonOneAction={() => {
            setShowRequestPaymentModal(false);
            setShowProvidePaymentDetails(true);
          }}
          buttonTwoTitle="Não"
          buttonTwoAction={() => {
            setShowRequestPaymentModal(false);
            handleAction(actionButtonStatus!);
          }}
        />
      )}

      {/* Modal para informar valor do frete após "Solicitar saldo" */}
      <ProvideFreightValue
        isOpen={showProvideFreightValue}
        onRequestClose={() => setShowProvideFreightValue(false)}
        handleConfirm={async (newTotal: number) => {
          // Ao confirmar atualizamos o valor total do frete
          const success = await handleUpdateFreightValues({ value: newTotal });
          if (success) {
            setShowProvideFreightValue(false);
            handleAction(actionButtonStatus!);
          } else {
            // Caso de erro: não avança status.
            // Você pode exibir uma mensagem ao usuário e permitir tentar novamente.
          }
        }}
        handleCancel={() => {
          // Ao clicar em "Agora não" também avançamos o status sem atualizar o valor total
          setShowProvideFreightValue(false);
          handleAction(actionButtonStatus!);
        }}
      />
    </div>
  );
};

export default FreightInCourseOptions;
