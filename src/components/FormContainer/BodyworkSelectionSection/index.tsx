<<<<<<< HEAD
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./BodyworkSelectionSection.module.css";
import { BodyworkCategory, BodyworkType } from "@/utils/enums/bodyworkEnums";

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

  const eligibleBodyworks = watch("eligibleBodyworks") || [];

  useEffect(() => {
    if (eligibleBodyworks.length === 0) {
      const initialBodyworks = bodyworkOptions.flatMap((categoryOption) =>
        categoryOption.types.map((bodywork) => ({
          category: categoryOption.category,
          type: bodywork.type,
          eligible: false,
        }))
      );
      setValue("eligibleBodyworks", initialBodyworks);
    }
  }, [eligibleBodyworks, setValue]);

  const handleBodyworkChange = (
    category: BodyworkCategory,
    type: BodyworkType,
    checked: boolean
  ) => {
    const updatedBodyworks = eligibleBodyworks.map((bodywork) =>
      bodywork.category === category && bodywork.type === type
        ? { ...bodywork, eligible: checked }
        : bodywork
    );
    setValue("eligibleBodyworks", updatedBodyworks);
  };

  const handleAllCategoryChange = (
    category: BodyworkCategory,
    checked: boolean
  ) => {
    const updatedBodyworks = eligibleBodyworks.map((bodywork) =>
      bodywork.category === category
        ? { ...bodywork, eligible: checked }
        : bodywork
    );
    setValue("eligibleBodyworks", updatedBodyworks);
=======
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./BodyworkSelectionSection.module.css";

interface BodyworkSelectionSectionProps {
  register: UseFormRegister<CreateFreightInput>;
}

const BodyworkSelectionSection: React.FC<BodyworkSelectionSectionProps> = ({
  register,
}) => {
  // Estados para as três categorias: Fechada, Aberta e Especial
  const [selectedFechada, setSelectedFechada] = useState({
    todosFechados: false,
    bau: false,
    sider: false,
    bauRefrigerado: false,
    bauFrigorifico: false,
  });

  const [selectedAberta, setSelectedAberta] = useState({
    todosAbertos: false,
    gradeBaixa: false,
    graneleira: false,
    cacamba: false,
    plataforma: false,
    prancha: false,
  });

  const [selectedEspecial, setSelectedEspecial] = useState({
    todosPesados: false,
    carreta: false,
    carretaTrucada: false,
    carretaLS: false,
    carretaVanderleia: false,
    bitrem: false,
    rodotrem: false,
  });

  // Lógica para "Todos os fechados"
  const handleFechadaChange = (key: string, checked: boolean) => {
    const updatedFechada = { ...selectedFechada, [key]: checked };
    setSelectedFechada(updatedFechada);

    const isAllFechadaSelected =
      updatedFechada.bau &&
      updatedFechada.sider &&
      updatedFechada.bauRefrigerado &&
      updatedFechada.bauFrigorifico;

    setSelectedFechada((prev) => ({
      ...prev,
      todosFechados: isAllFechadaSelected,
    }));
  };

  const handleTodosFechadaChange = (checked: boolean) => {
    setSelectedFechada({
      todosFechados: checked,
      bau: checked,
      sider: checked,
      bauRefrigerado: checked,
      bauFrigorifico: checked,
    });
  };

  // Lógica para "Todos os abertos"
  const handleAbertaChange = (key: string, checked: boolean) => {
    const updatedAberta = { ...selectedAberta, [key]: checked };
    setSelectedAberta(updatedAberta);

    const isAllAbertaSelected =
      updatedAberta.gradeBaixa &&
      updatedAberta.graneleira &&
      updatedAberta.cacamba &&
      updatedAberta.plataforma &&
      updatedAberta.prancha;

    setSelectedAberta((prev) => ({
      ...prev,
      todosAbertos: isAllAbertaSelected,
    }));
  };

  const handleTodosAbertaChange = (checked: boolean) => {
    setSelectedAberta({
      todosAbertos: checked,
      gradeBaixa: checked,
      graneleira: checked,
      cacamba: checked,
      plataforma: checked,
      prancha: checked,
    });
  };

  // Lógica para "Todos os especiais"
  const handleEspecialChange = (key: string, checked: boolean) => {
    const updatedEspecial = { ...selectedEspecial, [key]: checked };
    setSelectedEspecial(updatedEspecial);

    const isAllEspecialSelected =
      updatedEspecial.carreta &&
      updatedEspecial.carretaTrucada &&
      updatedEspecial.carretaLS &&
      updatedEspecial.carretaVanderleia &&
      updatedEspecial.bitrem &&
      updatedEspecial.rodotrem;

    setSelectedEspecial((prev) => ({
      ...prev,
      todosPesados: isAllEspecialSelected,
    }));
  };

  const handleTodosEspecialChange = (checked: boolean) => {
    setSelectedEspecial({
      todosPesados: checked,
      carreta: checked,
      carretaTrucada: checked,
      carretaLS: checked,
      carretaVanderleia: checked,
      bitrem: checked,
      rodotrem: checked,
    });
>>>>>>> dce10fb (conflict)
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Carroceria</h2>
      <p className={styles.subtitle}>Escolha quantas carrocerias quiser</p>

      <div className={styles.bodyworkCheckboxes}>
<<<<<<< HEAD
        {bodyworkOptions.map((categoryOption) => {
          const bodyworksInCategory = eligibleBodyworks.filter(
            (b) => b.category === categoryOption.category
          );
          const allChecked = bodyworksInCategory.every((b) => b.eligible);

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
              <label>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={(e) =>
                    handleAllCategoryChange(
                      categoryOption.category,
                      e.target.checked
                    )
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
                  <label key={bodywork.type}>
                    <input
                      type="checkbox"
                      checked={bodyworkState?.eligible || false}
                      onChange={(e) =>
                        handleBodyworkChange(
                          categoryOption.category,
                          bodywork.type,
                          e.target.checked
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
=======
        {/* Carrocerias Fechadas */}
        <div className={styles.checkboxColumn}>
          <h4>Fechada</h4>
          <label>
            <input
              type="checkbox"
              checked={selectedFechada.todosFechados}
              onChange={(e) => handleTodosFechadaChange(e.target.checked)}
            />
            Todos os fechados
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFechada.bau}
              onChange={(e) => handleFechadaChange("bau", e.target.checked)}
            />
            Baú
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFechada.sider}
              onChange={(e) => handleFechadaChange("sider", e.target.checked)}
            />
            Sider
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFechada.bauRefrigerado}
              onChange={(e) =>
                handleFechadaChange("bauRefrigerado", e.target.checked)
              }
            />
            Baú refrigerado
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFechada.bauFrigorifico}
              onChange={(e) =>
                handleFechadaChange("bauFrigorifico", e.target.checked)
              }
            />
            Baú frigorifico
          </label>
        </div>

        {/* Carrocerias Abertas */}
        <div className={styles.checkboxColumn}>
          <h4>Aberta</h4>
          <label>
            <input
              type="checkbox"
              checked={selectedAberta.todosAbertos}
              onChange={(e) => handleTodosAbertaChange(e.target.checked)}
            />
            Todos os abertos
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedAberta.gradeBaixa}
              onChange={(e) =>
                handleAbertaChange("gradeBaixa", e.target.checked)
              }
            />
            Grade Baixa
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedAberta.graneleira}
              onChange={(e) =>
                handleAbertaChange("graneleira", e.target.checked)
              }
            />
            Graneleira
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedAberta.cacamba}
              onChange={(e) => handleAbertaChange("cacamba", e.target.checked)}
            />
            Caçamba
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedAberta.plataforma}
              onChange={(e) =>
                handleAbertaChange("plataforma", e.target.checked)
              }
            />
            Plataforma
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedAberta.prancha}
              onChange={(e) => handleAbertaChange("prancha", e.target.checked)}
            />
            Prancha
          </label>
        </div>

        {/* Carrocerias Especiais */}
        <div className={styles.checkboxColumn}>
          <h4>Especial</h4>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.todosPesados}
              onChange={(e) => handleTodosEspecialChange(e.target.checked)}
            />
            Todos os pesados
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.carreta}
              onChange={(e) =>
                handleEspecialChange("carreta", e.target.checked)
              }
            />
            Carreta
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.carretaTrucada}
              onChange={(e) =>
                handleEspecialChange("carretaTrucada", e.target.checked)
              }
            />
            Carreta Trucada
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.carretaLS}
              onChange={(e) =>
                handleEspecialChange("carretaLS", e.target.checked)
              }
            />
            Carreta LS
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.carretaVanderleia}
              onChange={(e) =>
                handleEspecialChange("carretaVanderleia", e.target.checked)
              }
            />
            Carreta Vanderleia
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.bitrem}
              onChange={(e) => handleEspecialChange("bitrem", e.target.checked)}
            />
            Bitrem
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedEspecial.rodotrem}
              onChange={(e) =>
                handleEspecialChange("rodotrem", e.target.checked)
              }
            />
            Rodotrem
          </label>
        </div>
      </div>
>>>>>>> dce10fb (conflict)
    </section>
  );
};

export default BodyworkSelectionSection;
