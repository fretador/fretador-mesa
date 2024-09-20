// BodyworkSelectionSection.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./BodyworkSelectionSection.module.css";
import { BodyworkCategory, BodyworkType } from "@/utils/enums/bodyworkEnums";
import CheckboxIcon from "@/components/Checkbox"; // Importe o componente CheckboxIcon

interface BodyworkOption {
  category: BodyworkCategory;
  types: { type: BodyworkType; label: string }[];
}

const bodyworkOptions: BodyworkOption[] = [
  {
    category: BodyworkCategory.FECHADA,
    types: [
      { type: BodyworkType.BAU, label: "Baú" },
      { type: BodyworkType.BAU_FRIGORIFICO, label: "Baú Frigorífico" },
      { type: BodyworkType.SIDER, label: "Sider" },
    ],
  },
  {
    category: BodyworkCategory.ABERTA,
    types: [
      { type: BodyworkType.GRADE_BAIXA, label: "Grade Baixa" },
      { type: BodyworkType.GRADE_ALTA, label: "Grade Alta" },
      { type: BodyworkType.CARROCERIA, label: "Carroceria" },
      { type: BodyworkType.PLATAFORMA, label: "Plataforma" },
    ],
  },
  {
    category: BodyworkCategory.ESPECIAL,
    types: [
      { type: BodyworkType.CACAMBA, label: "Caçamba" },
      { type: BodyworkType.TANQUE, label: "Tanque" },
      { type: BodyworkType.GRANELEIRO, label: "Graneleiro" },
      { type: BodyworkType.MUNCK, label: "Munck" },
    ],
  },
];

const BodyworkSelectionSection: React.FC = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  // Inicialize eligibleBodyworks se estiver undefined
  const eligibleBodyworks = watch("eligibleBodyworks") || [];

  // Se eligibleBodyworks estiver vazio, inicialize com os valores iniciais
  if (eligibleBodyworks.length === 0) {
    const initialBodyworks = bodyworkOptions.flatMap((categoryOption) =>
      categoryOption.types.map((bodywork) => ({
        category: categoryOption.category,
        type: bodywork.type,
        eligible: false,
      }))
    );
    setValue("eligibleBodyworks", initialBodyworks, { shouldDirty: true });
  }

  const handleBodyworkChange = (
    category: BodyworkCategory,
    type: BodyworkType,
    checked: boolean
  ) => {
    const updatedBodyworks = eligibleBodyworks.map((bodywork) => {
      if (bodywork.category === category && bodywork.type === type) {
        return { ...bodywork, eligible: checked };
      }
      return bodywork;
    });
    setValue("eligibleBodyworks", updatedBodyworks, { shouldDirty: true });
  };

  const handleAllCategoryChange = (
    category: BodyworkCategory,
    checked: boolean
  ) => {
    const updatedBodyworks = eligibleBodyworks.map((bodywork) => {
      if (bodywork.category === category) {
        return { ...bodywork, eligible: checked };
      }
      return bodywork;
    });
    setValue("eligibleBodyworks", updatedBodyworks, { shouldDirty: true });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Carroceria</h2>
      <p className={styles.subtitle}>Escolha quantas carrocerias quiser</p>

      <div className={styles.bodyworkCheckboxes}>
        {bodyworkOptions.map((categoryOption) => {
          const bodyworksInCategory = eligibleBodyworks.filter(
            (b) => b.category === categoryOption.category
          );
          const allChecked =
            bodyworksInCategory.length > 0 &&
            bodyworksInCategory.every((b) => b.eligible);

          return (
            <div
              key={categoryOption.category}
              className={styles.checkboxColumn}
            >
              <h4>
                {categoryOption.category === BodyworkCategory.FECHADA
                  ? "Fechada"
                  : categoryOption.category === BodyworkCategory.ABERTA
                  ? "Aberta"
                  : "Especial"}
              </h4>
              <label
                className={styles.label}
                onClick={() =>
                  handleAllCategoryChange(categoryOption.category, !allChecked)
                }
              >
                <CheckboxIcon
                  checked={allChecked}
                  onChange={(checked) =>
                    handleAllCategoryChange(categoryOption.category, checked)
                  }
                />
                Todas as{" "}
                {categoryOption.category === BodyworkCategory.FECHADA
                  ? "fechadas"
                  : categoryOption.category === BodyworkCategory.ABERTA
                  ? "abertas"
                  : "especiais"}
              </label>
              {categoryOption.types.map((bodywork) => {
                const bodyworkState = eligibleBodyworks.find(
                  (b) =>
                    b.category === categoryOption.category &&
                    b.type === bodywork.type
                );
                return (
                  <label
                    key={bodywork.type}
                    className={styles.label}
                    onClick={() =>
                      handleBodyworkChange(
                        categoryOption.category,
                        bodywork.type,
                        !(bodyworkState?.eligible || false)
                      )
                    }
                  >
                    <CheckboxIcon
                      checked={bodyworkState?.eligible || false}
                      onChange={(checked) =>
                        handleBodyworkChange(
                          categoryOption.category,
                          bodywork.type,
                          checked
                        )
                      }
                    />
                    {bodywork.label}
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>

      {errors.eligibleBodyworks && (
        <p className={styles.errorMessage}>
          {errors.eligibleBodyworks.message}
        </p>
      )}
    </section>
  );
};

export default BodyworkSelectionSection;
