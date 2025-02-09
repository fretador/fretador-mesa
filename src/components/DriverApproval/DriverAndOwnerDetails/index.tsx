import React, { useState } from "react";
import styles from "./DriverAndOwnerDetails.module.css";
import { LogoWhatsAppIcon, PencilSolidIcon } from "@/utils/icons";
import ActionButtons from "../ActionButtons";
import { Driver } from "@/utils/Interfaces/Driver";

interface DriverAndOwnerDetailsProps {
  driver: Driver;
}

const DriverAndOwnerDetails = ({ driver }: DriverAndOwnerDetailsProps) => {

  // States para edição de dados do Motorista
  const [isDriverEditing, setIsDriverEditing] = useState(false);
  const [editableDriver, setEditableDriver] = useState({
    name: driver.name,
    phoneNumber: driver.phoneNumber,
    email: driver.email,
  });

  const handleDriverEditToggle = () => {
    setIsDriverEditing(!isDriverEditing);
  };

  const handleDriverInputChange = (field: string, value: string) => {
    setEditableDriver((prev) => ({ ...prev, [field]: value }));
  };


  // States para edição de dados do Proprietário
  const [isOwnerEditing, setIsOwnerEditing] = useState(false);
  const [editableOwner, setEditableOwner] = useState({
    name: driver.owner.name,
    phoneNumber: driver.owner.phoneNumber,
    email: driver.owner.email,
  });

  const handleOwnerEditToggle = () => {
    setIsOwnerEditing(!isOwnerEditing);
  };

  const handleOwnerInputChange = (field: string, value: string) => {
    setEditableOwner((prev) => ({ ...prev, [field]: value }));
  };


  // States para edição de dados de Pagamento
  const [isPaymentEditing, setIsPaymentEditing] = useState(false);
  const [editablePayment, setEditablePayment] = useState({
    name: driver.owner.name,
    bankName: driver.owner.bankName,
    bankAgency: driver.owner.bankAgency,
    bankAccount: driver.owner.bankAccount,
    pix: driver.owner.pix
  });

  const handlePaymentEditToggle = () => {
    setIsPaymentEditing(!isPaymentEditing);
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    setEditablePayment((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Motorista */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Motorista</p>
          <div
            className={styles.pencilIcon}
            onClick={handleDriverEditToggle}
          >
            <PencilSolidIcon fill={isDriverEditing ? "#A33830" : '#1A556D'} />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>
              Nome:{" "}
              {isDriverEditing ? (
                <input
                  type="text"
                  value={editableDriver.name}
                  onChange={(e) => handleDriverInputChange("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsDriverEditing(false)}
                  onBlur={() => setIsDriverEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableDriver.name}</span>
              )}
            </p>
            <p>
              CPF: <span>{driver.cpf}</span>
            </p>
          </div>

          <div className={styles.cnhAndContact}>
            <p>
              CNH: <span>{driver.cnh}</span>
            </p>
            <div className={styles.whatsappContainer}>
              <LogoWhatsAppIcon />
              <p>
                {isDriverEditing ? (
                  <input
                    type="text"
                    value={editableDriver.phoneNumber}
                    onChange={(e) => handleDriverInputChange("phoneNumber", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsDriverEditing(false)}
                    onBlur={() => setIsDriverEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableDriver.phoneNumber}</span>
                )}
              </p>
            </div>
            <p>
              E-mail:{" "}
              {isDriverEditing ? (
                <input
                  type="email"
                  value={editableDriver.email}
                  onChange={(e) => handleDriverInputChange("email", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsDriverEditing(false)}
                  onBlur={() => setIsDriverEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableDriver.email}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Proprietário */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Proprietário</p>
          <div
            className={styles.pencilIcon}
            onClick={handleOwnerEditToggle}
          >
            <PencilSolidIcon fill={isOwnerEditing ? "#A33830" : '#1A556D'} />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>
            Nome:{" "}
              {isOwnerEditing ? (
                <input
                  type="text"
                  value={editableOwner.name}
                  onChange={(e) => handleOwnerInputChange("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsOwnerEditing(false)}
                  onBlur={() => setIsOwnerEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableOwner.name}</span>
              )}
            </p>
            <p>
              CPF: <span>{driver.owner.cpf}</span>
            </p>
          </div>

          <div className={styles.cnhAndContact}>
            <p>
              CNH: <span>{driver.owner.cnh}</span>
            </p>
            <div className={styles.whatsappContainer}>
              <LogoWhatsAppIcon />
              <p>
              {isOwnerEditing ? (
                  <input
                    type="text"
                    value={editableOwner.phoneNumber}
                    onChange={(e) => handleOwnerInputChange("phoneNumber", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setIsOwnerEditing(false)}
                    onBlur={() => setIsOwnerEditing(false)}
                    className={styles.editInput}
                  />
                ) : (
                  <span>{editableOwner.phoneNumber}</span>
                )}
              </p>
            </div>
            <p>
              E-mail:{" "}
              {isOwnerEditing ? (
                <input
                  type="email"
                  value={editableOwner.email}
                  onChange={(e) => handleOwnerInputChange("email", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsOwnerEditing(false)}
                  onBlur={() => setIsOwnerEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableOwner.email}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Pagamento */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Pagamento</p>
          <div
            className={styles.pencilIcon}
            onClick={handlePaymentEditToggle}
          >
            <PencilSolidIcon fill={isPaymentEditing ? "#A33830" : '#1A556D'} />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>
            Favorecido:{" "}
              {isPaymentEditing ? (
                <input
                  type="text"
                  value={editablePayment.name}
                  onChange={(e) => handlePaymentInputChange("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsPaymentEditing(false)}
                  onBlur={() => setIsPaymentEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editablePayment.name}</span>
              )}
            </p>
            <p>
              CPF/CNPJ: <span>{driver.owner.cpf}</span>
            </p>
          </div>

          <div className={styles.bankDetailsAndPix}>
            <p>
              Dados Bancários:{" "}
              {isPaymentEditing ? (
                <div className={styles.bankDetailsInputContainer}>

                  <div className={styles.bankDetailsInput}>
                    <label>Banco:</label>
                    <input
                      type="text"
                      value={editablePayment.bankName}
                      onChange={(e) => handlePaymentInputChange("bankName", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setIsPaymentEditing(false)}
                      onBlur={() => setIsPaymentEditing(false)}
                      className={styles.editInput}
                    />
                  </div>

                  <div className={styles.bankDetailsInput}>
                    <label>Agência:</label>
                    <input
                      type="text"
                      value={editablePayment.bankAgency}
                      onChange={(e) => handlePaymentInputChange("bankAgency", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setIsPaymentEditing(false)}
                      onBlur={() => setIsPaymentEditing(false)}
                      className={styles.editInput}
                    />
                  </div>

                  <div className={styles.bankDetailsInput}>
                    <label>Conta:</label>
                    <input
                      type="text"
                      value={editablePayment.bankAccount}
                      onChange={(e) => handlePaymentInputChange("bankAccount", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setIsPaymentEditing(false)}
                      onBlur={() => setIsPaymentEditing(false)}
                      className={styles.editInput}
                    />
                  </div>

                </div>
              ) : (
                <span>
                  {editablePayment.bankName} / Ag {editablePayment.bankAgency} /
                  CC - {editablePayment.bankAccount}
                </span>
              )}
            </p>
            <p>
            PIX:{" "}
              {isPaymentEditing ? (
                <input
                  type="text"
                  value={editablePayment.pix}
                  onChange={(e) => handlePaymentInputChange("pix", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsPaymentEditing(false)}
                  onBlur={() => setIsPaymentEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editablePayment.pix}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <ActionButtons />
    </>
  );
};

export default DriverAndOwnerDetails;
