import React, { useState } from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Configuracoes.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { BackIcon, PhotoOutlineIcon, RadioFalseIcon, RadioTrueIcon } from "@/utils/icons";
import Image from "next/image";
import { mockBoardUsers } from "@/utils/mocks/mockBoardUsers";


const Configuracoes: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState(mockBoardUsers[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "Zé do Frete",
    contact: "11-99999-9999",
  });
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const defaultAvatarPath = "../../assets/src/images/avatar.png";
  const imageSrc = currentUser.profilePicture && currentUser.profilePicture.trim() !== ""
    ? currentUser.profilePicture
    : defaultAvatarPath;

  const backButtonContent = (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToPage = () => {
    router.push("/alterar-senha");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setCurrentUser((prev) => ({
      ...prev,
      name: editedData.name,
      contact: editedData.contact,
    }));
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setCurrentUser((prev) => ({
            ...prev,
            profilePicture: reader.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const [value, setValue] = useState<string>("");

  const routeName = 'CONFIGURAÇÕES'

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
                <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
              </div>

              <div className={styles.profileContainer}>
                <div className={styles.nameAndImageContainer}>
                  <div className={styles.imageContainer}>
                    <Image src={imageSrc} width={154} height={154} alt="user-profile" className={styles.imageProfile} />
                    <div className={styles.changePhotoIcon}>
                      <label htmlFor="photo-upload">
                        <PhotoOutlineIcon />
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className={styles.hiddenInput}
                          onChange={handlePhotoUpload}
                        />
                      </label>
                    </div>
                  </div>
                  <p>
                    Nome do usuário:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={styles.editInput}
                      />
                    ) : (
                      <span>{editedData.name}</span>
                    )}
                  </p>
                </div>

                <div className={styles.detailsContainer}>
                  <p>Empresa: <span>Fretador Transportes</span></p>
                  <p>Função: <span>Operacional</span></p>
                  <p>E-mail: <span>zedofrete@fretador.com.br</span></p>
                  <p>
                    Contato:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.contact}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                        className={styles.editInput}
                      />
                    ) : (
                      <span>{editedData.contact}</span>
                    )}
                  </p>
                </div>

                <div className={styles.roleContainer}>
                  <h3>Administrador</h3>
                  <div className={styles.iconGroup}>
                    <div
                      className={styles.iconOption}
                      onClick={() => setValue("Sim")}
                    >
                      {value === "Sim" ? (
                        <RadioTrueIcon className={styles.icon} width={24} height={24} />
                      ) : (
                        <RadioFalseIcon className={styles.icon} width={24} height={24} />
                      )}
                      <input
                        type="radio"
                        name="adminOption"
                        value="Sim"
                        checked={value === "Sim"}
                        className={styles.hiddenRadio}
                        onChange={() => {}}
                      />
                      <span className={styles.iconText}>Sim</span>
                    </div>
                    <div
                      className={styles.iconOption}
                      onClick={() => setValue("Não")}
                    >
                      {value === "Não" ? (
                        <RadioTrueIcon className={styles.icon} width={24} height={24} />
                      ) : (
                        <RadioFalseIcon className={styles.icon} width={24} height={24} />
                      )}
                      <input
                        type="radio"
                        name="adminOption"
                        value="Não"
                        checked={value === "Não"}
                        className={styles.hiddenRadio}
                        onChange={() => {}}
                      />
                      <span className={styles.iconText}>Não</span>
                    </div>
                  </div>
                </div>

                <Botao text="Alterar senha" onClick={handleGoToPage} className={styles.changePasswordButton} />

                <div className={styles.editButtonContainer}>
                  {isEditing ? (
                    <div className={styles.saveButtonContainer}>
                      <Botao text="Salvar edição" onClick={handleSave} className={styles.saveButton} />
                      <Botao text="Cancelar" onClick={handleEditToggle} className={styles.cancelButton} />
                    </div>
                  ) : (
                    <Botao text="Editar dados" onClick={handleEditToggle} className={styles.editButton} />
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

export default Configuracoes;
