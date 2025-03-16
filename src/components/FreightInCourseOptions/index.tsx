import React, { useRef, useState } from "react";
import { useAppSelector } from "@/store/store";
import styles from "./FreightInCourseOptions.module.css";
import { useDocumentController } from "@/controllers/documentController";
import {
  CheckFillIcon,
  DangerIcon,
  DocIcon,
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
import { dateNow } from "@/utils/dates";
import ProvidePaymentDetails from "@/components/Modal/FreteEmCurso/ProvidePaymentDetails";
import TravelWithoutPayment from "@/components/Modal/FreteEmCurso/TravelWithoutPayment";
import ProvideFreightValue from "@/components/Modal/FreteEmCurso/ProvideFreightValue";
import FreightDocuments from "../Modal/FreteEmCurso/FreightDocuments";
import { RequestFinancialType } from "@/utils/enums/requestFinancialTypeEnum";
import SendAlert from "../Modal/FreteEmCurso/SendAlert";
import { FreightDocumentTypeEnum } from "@/utils/enums/freightDocumentTypeEnum";
import { freightDocumentTypeLabels } from "@/utils/labels/freightDocumentStatusLabels";

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

  // Modal para confirmar envio de dados de pagamento ao financeiro
  const [showPaymentDetailsConfirmed, setShowPaymentDetailsConfirmed] = useState(false);

  // Modal para confirmar envio de solicitação de comprovantes ao motorista
  const [requestProofsConfirmed, setRequestProofsConfirmed] = useState(false);

  // Modal para perguntar se continua sem informar valores ou não
  const [showNoPaymentNowModal, setShowNoPaymentNowModal] = useState(false);

  // Modal para viagem sem pagamento
  const [showTravelWithoutPayment, setShowTravelWithoutPayment] = useState(false);

  // Modal "Informar pagamento" após solicitar comprovantes
  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false);

  // Modal "ProvideFreightValue" após "Solicitar saldo"
  const [showProvideFreightValue, setShowProvideFreightValue] = useState(false);

  // Modal "FreightDocuments" para abrir o action button "Documentos"
  const [showFreightDocumentsModal, setShowFreightDocumentsModal] = useState(false);

  // Modal para exibir a mensagem de alerta
  const [sendAlertModal, setSendAlertModal] = useState(false);

  // Variável para controlar o círculo vermelho indicativo da próxima ação
  const [activeBubble, setActiveBubble] = useState("actionButton");

  // Função para definir em qual div a bolinha vai aparecer
  const showBubble = (divName: string) => {
    setActiveBubble(divName);
  };

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
              boardUser: { id: boardUser?.id ?? "indisponível", name: boardUser?.name, profile: boardUser?.profile },
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
    balanceValue?: number;
  }) => {
    try {
      const currentDate = dateNow();

      // Define o tipo de pagamento com base nos valores informados
      let requestFinancialType: RequestFinancialType | undefined;

      const hasAdvance = newValues.advanceValue !== undefined && newValues.advanceValue > 0;
      const hasBalance = newValues.balanceValue !== undefined && newValues.balanceValue > 0;
      const hasOnlyTotal = newValues.value !== undefined && newValues.value > 0 && !hasAdvance && !hasBalance;

      if (hasAdvance && hasBalance) {
        // Pagamento em duas etapas: primeiro ADVANCE, depois PARTIAL_BALANCE
        requestFinancialType = RequestFinancialType.ADVANCE;
      } else if (hasOnlyTotal) {
        // Pagamento único do total do frete
        requestFinancialType = RequestFinancialType.BALANCE;
      }

      const freightUpdateInput: Record<string, any> = {
        ...newValues,
        boardUser: { name: boardUser?.name, profile: boardUser?.profile },
      };

      // Define datas de solicitação
      if (hasAdvance) {
        freightUpdateInput.advanceRequestedDate = currentDate;
      }
      if (hasBalance) {
        freightUpdateInput.balanceRequestedDate = currentDate;
      }
      if (newValues.value && newValues.value > 0) {
        freightUpdateInput.paymentRequestedDate = currentDate;
      }

      // Se definimos um tipo de pagamento, incluímos no input
      if (requestFinancialType) {
        freightUpdateInput.requestFinancialType = requestFinancialType;
      }

      await updateFreight({
        variables: {
          id: freightId,
          input: freightUpdateInput,
        },
      });
      return true;
    } catch (error) {
      console.error("Erro ao atualizar valores do frete:", error);
      alert("Ocorreu um erro ao atualizar os valores do frete. Por favor, tente novamente.");
      return false;
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
    filesWithTypes: {
      file: File;
      type: FreightDocumentTypeEnum;
      label: string
    }[]
  ) => {
    try {
      setIsLoading(true);
      // Renomear arquivos com prefixo correto
      const modifiedFiles = filesWithTypes.map(({ file, label }) => {
        return new File([file], `${label}_${file.name}`, { type: file.type });
      });

      // Upload mantendo o tipo correto (enum)
      const files = modifiedFiles;
      const types = filesWithTypes.map(({ type }) => type);

      // Resto do código de upload mantido
      await uploadDocuments(files, types);

      // Atualização dos documentos com tipo correto
      const updateData = filesWithTypes.map(({ file, type }) => ({
        name: `${freightDocumentTypeLabels[type]}_${file.name}`,
        type,
        size: file.size,
      }));

      // Atualiza status do frete
      const nextStatus = getNextStatus(currentStatus);

      if (nextStatus) {
        await updateStatusFreight({
          variables: {
            id: freightId,
            input: {
              status: nextStatus,
              updateData: {
                documents: updateData,
                boardUser: {
                  id: boardUser?.id ?? "indisponível",
                  name: boardUser?.name,
                  profile: boardUser?.profile,
                },
              },
              updateDataType: UpdateDataTypeEnum.DOCUMENT,
            },
          },
        });
      } else {
        console.log("Próximo status não encontrado.");
      }

      setIsLoading(false);
      setShowTypeModal(false);
      setShowModal(true);
      showBubble("actionButton");
    } catch (error) {
      console.error("Erro ao processar documentos:", error);
      setIsLoading(false);
    }
  };

  /**
   * Fecha o modal de tipo de documento e exibe o modal de documentos enviados.
   */
  const handleCloseTypeModal = () => {
    setShowTypeModal(false);
    // setShowModal(true);
    setIsLoading(false);
  };

  /**
   * Dispara alerta (log de exemplo).
   */
  const handleSendAlert = () => {
    setSendAlertModal(!sendAlertModal)
  };

  /**
   * Interage com o motorista (log de exemplo).
   */
  const handleTalkToDriver = () => {
    console.log("Falou com o motorista");
  };

  /**
   * Interage com o motorista (log de exemplo).
   */
  const handleOpenDocsModal = () => {
    setShowFreightDocumentsModal(!showFreightDocumentsModal)
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
          setModalConfig(null);
          setModalConfig({
            isVisible: true,
            title: "Autorizar Embarque",
            description: "Por favor envie a ordem de coleta no: Anexar Documentos.",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
          showBubble("attachDocuments");
          handleAction(actionButtonStatus!);
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
          setModalConfig({
            isVisible: true,
            title: "Autorizar Embarque",
            description: "Por favor envie a ordem de coleta no: Anexar Documentos.",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
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
        confirmText: "Ok",
        onConfirm: () => {
          setModalConfig(null);
        },
      });
      showBubble("attachDocuments");
    },
    [FreightStatus.PICKUP_ORDER_SENT]: () => {
      setModalConfig({
        isVisible: true,
        title: "Autorizar Embarque",
        description: "Por favor envie a ordem de coleta no: Anexar Documentos.",
        confirmText: "Ok",
        onConfirm: () => {
          setModalConfig(null);
        },
      });
      showBubble("attachDocuments");
    },
    [FreightStatus.LOADING_STARTED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Carregar carga",
        description: "Confirma o início do carregamento do veículo?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          setModalConfig(null);
          setModalConfig({
            isVisible: true,
            title: "Carregar carga",
            description: "Ao completar o carregamento envie o CTE e o Manifesto no Anexar documentos.",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
          handleAction(actionButtonStatus!);
          showBubble("attachDocuments");
        },
      });
    },
    [FreightStatus.LOADING_FINISHED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Carregar carga",
        description: "Ao completar o carregamento envie o CTE e o Manifesto no Anexar documentos.",
        confirmText: "Ok",
        onConfirm: () => {
          showBubble("attachDocuments");
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
            // handleAction(actionButtonStatus!);
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
          showBubble("actionButton");
          handleAction(actionButtonStatus!);
          setModalConfig(null);
        },
      });
    },
    [FreightStatus.OPERATION_APPROVED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Solicitar comprovantes",
        description: "Gostaria de solicitar os comprovantes de entrega ao motorista?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          showBubble("viewDocuments");
          handleAction(actionButtonStatus!);
          setModalConfig(null);
          setRequestProofsConfirmed(true)
        }
      });
    },
    [FreightStatus.INVOICE_COUPON_SENT]: () => {
      setModalConfig({
        isVisible: true,
        title: "Aprovar comprovantes",
        description: "Confirma a aprovação dos comprovantes enviados pelo motorista?",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          showBubble("actionButton");
          handleAction(actionButtonStatus!);
          setModalConfig(null);
          setModalConfig({
            isVisible: true,
            title: "Aprovar comprovantes",
            description: "Comprovantes aprovados",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            }
          });
        }
      });
    },
    [FreightStatus.FINANCIAL_REQUIRED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Solicitar saldo",
        description:
          "Gostaria de solicitar ao financeiro saldo de frete? (os comprovantes devem estar dentro das especificações do financeiro)",
        confirmText: "Sim",
        cancelText: "Não",
        onConfirm: () => {
          setModalConfig(null);
          showBubble("");
          // Verifica apenas se já existe o valor total (value)
          if (value !== undefined) {
            // Já existe valor total do frete, avança diretamente
            setModalConfig({
              isVisible: true,
              title: "Solicitar saldo",
              description: "Saldo solicitado ao financeiro com sucesso!",
              confirmText: "Ok",
              onConfirm: () => {
                setModalConfig(null);
              }
            });
            handleAction(actionButtonStatus!);
          } else {
            // Exibe modal para informar valor total do frete
            setShowProvideFreightValue(true);
          }
        },
      });
    },
    [FreightStatus.FINANCIAL_APPROVED]: () => {
      setModalConfig({
        isVisible: true,
        title: "Solicitar saldo",
        description:
          "Saldo já solicitado. Aguardando financeiro.",
        confirmText: "Ok",
        onConfirm: () => {
          setModalConfig(null);
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
        {activeBubble === "attachDocuments" && <div className={styles.bubble}></div>}
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
          {activeBubble === "actionButton" && <div className={styles.bubble}></div>}
        </div>
      ) : (
        <div className={styles.iconContainer}>
          <CheckFillIcon />
          <p>{actionButtonText}</p>
          {activeBubble === "actionButton" && <div className={styles.bubble}></div>}
        </div>
      )}

      {/* Botão para enviar alertas */}
      <div className={styles.iconContainer} onClick={handleSendAlert}>
        <DangerIcon />
        <p>Enviar Alertas</p>
        {activeBubble === "sendAlert" && <div className={styles.bubble}></div>}
      </div>

      {/* Botão para falar com o motorista */}
      <div className={styles.iconContainer} onClick={handleTalkToDriver}>
        <WhatsAppIcon />
        <p>Falar Com Motorista</p>
      </div>

      {/* Botão para ver documentos enviados pelo motorista */}
      <div className={styles.iconContainer} onClick={handleOpenDocsModal}>
        <DocIcon />
        <p>Documentos</p>
        {activeBubble === "viewDocuments" && <div className={styles.bubble}></div>}
      </div>

      {/* Modal que confirma envio de documentos */}
      <DocumentSentModal isOpen={showModal} onRequestClose={closeModal} />

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
            setShowPaymentDetailsConfirmed(true);
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

      {/* Modal de confirmação de valores enviados ao financeiro */}
      {showPaymentDetailsConfirmed && (
        <Modal
          modalTitle="Dados de pagamento"
          modalDescription="Dados de pagamento enviados ao financeiro!"
          buttonOneTitle="Ok"
          buttonOneAction={() => setShowPaymentDetailsConfirmed(false)}
          isOpen={showPaymentDetailsConfirmed}
          onRequestClose={() => setShowPaymentDetailsConfirmed(false)}
        />
      )}

      {/* Modal de Documentos Enviados pelo Motorista */}
      {showFreightDocumentsModal && (
        <FreightDocuments
          isOpen={showFreightDocumentsModal}
          onRequestClose={() => setShowFreightDocumentsModal(!showFreightDocumentsModal)}
          handleDownloadPdf={() => {
            setModalConfig({
              isVisible: true,
              title: "Download PDF",
              description:
                "Download realizado com sucesso!",
              confirmText: "Ok",
              onConfirm: () => {
                setModalConfig(null);
              },
            });
          }}
        />
      )}

      {/* Modal de confirmação de solicitação de comprovantes enviados pro motorista */}
      {requestProofsConfirmed && (
        <Modal
          modalTitle="Solicitar comprovantes"
          modalDescription="Comprovantes solicitados!"
          buttonOneTitle="Ok"
          buttonOneAction={() => setRequestProofsConfirmed(false)}
          isOpen={requestProofsConfirmed}
          onRequestClose={() => setRequestProofsConfirmed(false)}
        />
      )}

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
                  boardUser: { id: boardUser?.id ?? "indisponível", name: boardUser?.name, profile: boardUser?.profile },
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

      {/* Modal para envio de mensagem de alerta para o motorista */}
      <SendAlert
        isOpen={sendAlertModal}
        onRequestClose={() => setSendAlertModal(!sendAlertModal)}
        handleConfirm={() => {
          setSendAlertModal(!sendAlertModal)
          setModalConfig({
            isVisible: true,
            title: "Enviar alerta",
            description: "Alerta enviado com sucesso!",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
        }}
        handleCancel={() => setSendAlertModal(!sendAlertModal)}
      />
    </div>


  );
};

export default FreightInCourseOptions;
