import React, { useState } from "react";
import styles from './ActionButtons.module.css';
import Botao from "@/components/Botao";
import { BackIcon, DownloadIcon } from "@/utils/icons";
import Modal from "@/components/Modal";
import RequestDocuments from "@/components/Modal/AprovacaoCadastroMotorista/RequestDocuments";
import BlockDriver from "@/components/Modal/AprovacaoCadastroMotorista/BlockDriver";
import UnblockDriver from "@/components/Modal/AprovacaoCadastroMotorista/UnblockDriver";

interface ActionButtonsProps {
  showApprove?: boolean;
  showRequest?: boolean;
  showDownload?: boolean;
  showBlock?: boolean;
  showUnblock?: boolean;
  showSelectPhotos?: boolean;
  isSelectionMode?: boolean;
  setIsSelectionMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButtons = ({
  showApprove,
  showRequest,
  showDownload,
  showBlock,
  showUnblock,
  showSelectPhotos,
  isSelectionMode = false,
  setIsSelectionMode = () => {}
}: ActionButtonsProps) => {

  const [modalConfig, setModalConfig] = useState<{
    isVisible: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
  } | null>(null);

  // Modal para informar tipo de documento solicitado
  const [showRequestDocumentsModal, setShowRequestDocumentsModal] = useState(false);

  // Modal para informar motivo do bloqueio do motorista
  const [showBlockDriverModal, setShowBlockDriverModal] = useState(false);

  // Modal para informar motivo do desbloqueio do motorista
  const [showUnblockDriverModal, setShowUnblockDriverModal] = useState(false);

  const handleApprove = () => {
    setModalConfig({
      isVisible: true,
      title: "Aprovar cadastro",
      description: "Confirma a aprovação desse cadastro?",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: () => {
        setModalConfig(null);
        setModalConfig({
          isVisible: true,
          title: "Aprovar cadastro",
          description: "Cadastro aprovado com sucesso!",
          confirmText: "Ok",
          onConfirm: () => {
            setModalConfig(null);
          },
        });
      },
    });
  };

  const handleRequestDocument = () => {
    setShowRequestDocumentsModal(true)
  };

  const handleDownload = () => {
    setModalConfig({
      isVisible: true,
      title: "Download",
      description: "Download realizado com sucesso!",
      confirmText: "Ok",
      onConfirm: () => {
        setModalConfig(null);
      },
    });
  };

  const handleBlock = () => {
    setShowBlockDriverModal(true)
  };

  const handleUnblock = () => {
    setShowUnblockDriverModal(true)
  };

  const handleSelectPhotos = () => {
    setIsSelectionMode(!isSelectionMode);
  };

  return (
    <div className={styles.buttonsContainer}>
      {isSelectionMode && (
        <Botao
          text={
            <div className={styles.downloadButton}>
              <BackIcon />
            </div>
          }
          className={`${styles.button} ${styles.download}`}
          onClick={() => setIsSelectionMode(!isSelectionMode)}
        />
      )}
      {isSelectionMode ? (
        <>
          <Botao text="Aprovar Fotos Selecionadas" className={`${styles.button} ${styles.approve}`} onClick={() => console.log('Aprovou fotos selecionadas')} />
          <Botao text="Download Selecionadas" className={`${styles.button} ${styles.download}`} onClick={() => console.log('Baixou fotos selecionadas')} />
        </>
      ) : (
        showSelectPhotos && (
          <Botao text="Selecionar Fotos" className={`${styles.button}`} onClick={handleSelectPhotos} />
        )
      )}
      {showApprove && (
        <Botao text="Aprovar Cadastro" className={`${styles.button} ${styles.approve}`} onClick={handleApprove} />
      )}
      {showRequest && (
        <Botao text="Solicitar Documento" className={`${styles.button} ${styles.request}`} onClick={handleRequestDocument} />
      )}
      {showDownload && (
        <Botao
          text={
            <div className={styles.downloadButton}>
              <DownloadIcon /> <p>Download PDF</p>
            </div>
          }
          className={`${styles.button} ${styles.download}`}
          onClick={handleDownload}
        />
      )}
      {showBlock && (
        <Botao text="Bloquear Motorista" className={`${styles.button} ${styles.block}`} onClick={handleBlock} />
      )}
      {showUnblock && (
        <Botao text="Desbloquear Motorista" className={`${styles.button} ${styles.unblock}`} onClick={handleUnblock} />
      )}

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

      <RequestDocuments
        isOpen={showRequestDocumentsModal}
        onRequestClose={() => setShowRequestDocumentsModal(!showRequestDocumentsModal)}
        handleConfirm={() => {
          setShowRequestDocumentsModal(!showRequestDocumentsModal)
          setModalConfig({
            isVisible: true,
            title: "Solicitar documentos",
            description: "Documento solicitado com sucesso!",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
        }}
        handleCancel={() => setShowRequestDocumentsModal(!showRequestDocumentsModal)}
      />

      <BlockDriver
        isOpen={showBlockDriverModal}
        onRequestClose={() => setShowBlockDriverModal(!showBlockDriverModal)}
        handleConfirm={() => {
          setShowBlockDriverModal(!showBlockDriverModal)
          setModalConfig({
            isVisible: true,
            title: "Bloquear motorista",
            description: "Motorista bloqueado com sucesso!",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
        }}
        handleCancel={() => setShowBlockDriverModal(!showBlockDriverModal)}
      />

      <UnblockDriver
        isOpen={showUnblockDriverModal}
        onRequestClose={() => setShowUnblockDriverModal(!showUnblockDriverModal)}
        handleConfirm={() => {
          setShowUnblockDriverModal(!showUnblockDriverModal)
          setModalConfig({
            isVisible: true,
            title: "Desbloquear motorista",
            description: "Motorista desbloqueado com sucesso!",
            confirmText: "Ok",
            onConfirm: () => {
              setModalConfig(null);
            },
          });
        }}
        handleCancel={() => setShowUnblockDriverModal(!showUnblockDriverModal)}
      />
    </div>
  );
};

export default ActionButtons;
