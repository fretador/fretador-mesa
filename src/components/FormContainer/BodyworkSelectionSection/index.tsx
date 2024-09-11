import React, { useState, useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./BodyworkSelectionSection.module.css";

interface BodyworkSelectionSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  setValue: UseFormSetValue<CreateFreightInput>;
}

const BodyworkSelectionSection: React.FC<BodyworkSelectionSectionProps> = ({
  register,
  setValue,
}) => {
  const [eligibleBodyworks, setEligibleBodyworks] = useState({
    aberta: {
      grade_baixa: { eligible: false },
      grade_alta: { eligible: false },
      carroceria: { eligible: false },
      plataforma: { eligible: false },
    },
    fechada: {
      bau: { eligible: false },
      bau_frigorifico: { eligible: false },
      sider: { eligible: false },
    },
    especial: {
      cacamba: { eligible: false },
      tanque: { eligible: false },
      graneleiro: { eligible: false },
      munck: { eligible: false },
    },
  });

  useEffect(() => {
    setValue(
      "eligibleBodyworks" as keyof CreateFreightInput,
      eligibleBodyworks
    );
  }, [eligibleBodyworks, setValue]);

  const handleBodyworkChange = (
    category: string,
    type: string,
    checked: boolean
  ) => {
    setEligibleBodyworks((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [type]: { eligible: checked },
      },
    }));
  };

  const handleAllCategoryChange = (category: string, checked: boolean) => {
    setEligibleBodyworks((prev) => ({
      ...prev,
      [category]: Object.keys(prev[category as keyof typeof prev]).reduce(
        (acc, type) => {
          acc[type] = { eligible: checked };
          return acc;
        },
        {} as Record<string, { eligible: boolean }>
      ),
    }));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Carroceria</h2>
      <p className={styles.subtitle}>Escolha quantas carrocerias quiser</p>

      <div className={styles.bodyworkCheckboxes}>
        {/* Abertas */}
        <div className={styles.checkboxColumn}>
          <h4>Abertas</h4>
          <label>
            <input
              type="checkbox"
              checked={Object.values(eligibleBodyworks.aberta).every(
                (v) => v.eligible
              )}
              onChange={(e) =>
                handleAllCategoryChange("aberta", e.target.checked)
              }
            />
            Todas as abertas
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.aberta.grade_baixa.eligible}
              onChange={(e) =>
                handleBodyworkChange("aberta", "grade_baixa", e.target.checked)
              }
            />
            Grade baixa
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.aberta.grade_alta.eligible}
              onChange={(e) =>
                handleBodyworkChange("aberta", "grade_alta", e.target.checked)
              }
            />
            Grade alta
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.aberta.carroceria.eligible}
              onChange={(e) =>
                handleBodyworkChange("aberta", "carroceria", e.target.checked)
              }
            />
            Carroceria
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.aberta.plataforma.eligible}
              onChange={(e) =>
                handleBodyworkChange("aberta", "plataforma", e.target.checked)
              }
            />
            Plataforma
          </label>
        </div>

        {/* Fechadas */}
        <div className={styles.checkboxColumn}>
          <h4>Fechadas</h4>
          <label>
            <input
              type="checkbox"
              checked={Object.values(eligibleBodyworks.fechada).every(
                (v) => v.eligible
              )}
              onChange={(e) =>
                handleAllCategoryChange("fechada", e.target.checked)
              }
            />
            Todas as fechadas
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.fechada.bau.eligible}
              onChange={(e) =>
                handleBodyworkChange("fechada", "bau", e.target.checked)
              }
            />
            Baú
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.fechada.bau_frigorifico.eligible}
              onChange={(e) =>
                handleBodyworkChange(
                  "fechada",
                  "bau_frigorifico",
                  e.target.checked
                )
              }
            />
            Baú frigorífico
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.fechada.sider.eligible}
              onChange={(e) =>
                handleBodyworkChange("fechada", "sider", e.target.checked)
              }
            />
            Sider
          </label>
        </div>

        {/* Especiais */}
        <div className={styles.checkboxColumn}>
          <h4>Especiais</h4>
          <label>
            <input
              type="checkbox"
              checked={Object.values(eligibleBodyworks.especial).every(
                (v) => v.eligible
              )}
              onChange={(e) =>
                handleAllCategoryChange("especial", e.target.checked)
              }
            />
            Todas as especiais
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.especial.cacamba.eligible}
              onChange={(e) =>
                handleBodyworkChange("especial", "cacamba", e.target.checked)
              }
            />
            Caçamba
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.especial.tanque.eligible}
              onChange={(e) =>
                handleBodyworkChange("especial", "tanque", e.target.checked)
              }
            />
            Tanque
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.especial.graneleiro.eligible}
              onChange={(e) =>
                handleBodyworkChange("especial", "graneleiro", e.target.checked)
              }
            />
            Graneleiro
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleBodyworks.especial.munck.eligible}
              onChange={(e) =>
                handleBodyworkChange("especial", "munck", e.target.checked)
              }
            />
            Munck
          </label>
        </div>
      </div>
    </section>
  );
};

export default BodyworkSelectionSection;
