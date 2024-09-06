import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FreightSchema, FreightFormValues } from "@/utils/validations";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import styles from "./CriarFretes.module.css";
import { useAppSelector } from "@/store/store";

const CreateFreight: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FreightFormValues>({
    resolver: zodResolver(FreightSchema),
  });

  const onSubmit = (data: FreightFormValues) => {
    console.log("Freight Data: ", data);
    // Lógica para enviar os dados do formulário
  };

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
            <Header title={"Cadastrar Nova Carga"} />
          </div>
          <div className={styles.content}>
            <Body>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/* Dados da coleta / entrega */}
                <section className={styles.section}>
                  <h2>Dados da coleta / entrega</h2>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="pickupDeliveryData">
                      DATA DO CARREGAMENTO
                    </label>
                    <input
                      id="pickupDeliveryData"
                      type="date"
                      {...register("pickupDeliveryData")}
                      className={styles.input}
                    />
                    {errors.pickupDeliveryData && (
                      <p className={styles.error}>
                        {errors.pickupDeliveryData.message}
                      </p>
                    )}
                  </div>
                  <div className={styles.rowInputs}>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="origin">Origem</label>
                      <input
                        id="origin"
                        type="text"
                        {...register("origin")}
                        className={styles.input}
                        placeholder="Indique a origem ou CNPJ do remetente"
                      />
                      {errors.origin && (
                        <p className={styles.error}>{errors.origin.message}</p>
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="destination">Destino</label>
                      <input
                        id="destination"
                        type="text"
                        {...register("destination")}
                        className={styles.input}
                        placeholder="Insira o destino ou o CNPJ do destinatário"
                      />
                      {errors.destination && (
                        <p className={styles.error}>
                          {errors.destination.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Dados da carga */}
                <section className={styles.section}>
                  <h2>Dados da carga</h2>
                  <div className={styles.rowRadioGroups}>
                    <div className={styles.radioGroup}>
                      <p>Tipo de carga</p>
                      <div className={styles.rowRadioOptions}>
                        <label>
                          <input
                            type="radio"
                            {...register("cargoLoadType")}
                            value="completa"
                          />
                          Completa
                        </label>
                        <label>
                          <input
                            type="radio"
                            {...register("cargoLoadType")}
                            value="complemento"
                          />
                          Complemento
                        </label>
                      </div>
                    </div>

                    <div className={styles.radioGroup}>
                      <p>Precisa de Lona?</p>
                      <div className={styles.rowRadioOptions}>
                        <label>
                          <input
                            type="radio"
                            {...register("needsTarp")}
                            value="sim"
                          />
                          Sim
                        </label>
                        <label>
                          <input
                            type="radio"
                            {...register("needsTarp")}
                            value="nao"
                          />
                          Não
                        </label>
                      </div>
                    </div>

                    <div className={styles.radioGroup}>
                      <p>Precisa de Rastreador?</p>
                      <div className={styles.rowRadioOptions}>
                        <label>
                          <input
                            type="radio"
                            {...register("needsTracker")}
                            value="sim"
                          />
                          Sim
                        </label>
                        <label>
                          <input
                            type="radio"
                            {...register("needsTracker")}
                            value="nao"
                          />
                          Não
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={styles.rowInputs}>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="product">Produto</label>
                      <input
                        id="product"
                        type="text"
                        {...register("product")}
                        className={styles.input}
                        placeholder="Qual produto será carregado? (ex: cimento, tubos, químicos, etc...)"
                      />
                      {errors.product && (
                        <p className={styles.error}>{errors.product.message}</p>
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="cargoType">Espécie</label>
                      <select
                        id="cargoType"
                        {...register("cargoType")}
                        className={styles.select}
                      >
                        <option value="">Selecione a espécie de carga</option>
                        <option value="Animais">Animais</option>
                        <option value="Big Bag">Big Bag</option>
                        <option value="Caixas">Caixas</option>
                        <option value="Container">Container</option>
                        <option value="Diversos">Diversos</option>
                        <option value="Fardos">Fardos</option>
                        <option value="Fracionada">Fracionada</option>
                        <option value="Granel">Granel</option>
                        <option value="Metro Cubico">Metro Cúbico</option>
                        <option value="Milheiro">Milheiro</option>
                        <option value="Mudança">Mudança</option>
                        <option value="Paletes">Paletes</option>
                        <option value="Passageiro">Passageiro</option>
                        <option value="Sacos">Sacos</option>
                        <option value="Tambor">Tambor</option>
                        <option value="Unidades">Unidades</option>
                      </select>
                      {errors.cargoType && (
                        <p className={styles.error}>
                          {errors.cargoType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.rowInputs}>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="totalWeight">Peso total de carga</label>
                      <input
                        id="totalWeight"
                        type="text"
                        {...register("totalWeight")}
                        className={styles.input}
                        placeholder="Kg"
                      />
                      {errors.totalWeight && (
                        <p className={styles.error}>
                          {errors.totalWeight.message}
                        </p>
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="volumes">Volumes (opcional)</label>
                      <input
                        id="volumes"
                        type="text"
                        {...register("volumes")}
                        className={styles.input}
                      />
                      {errors.volumes && (
                        <p className={styles.error}>{errors.volumes.message}</p>
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="cubage">Cubagem (opcional)</label>
                      <input
                        id="cubage"
                        type="text"
                        {...register("cubage")}
                        className={styles.input}
                        placeholder="m³"
                      />
                      {errors.cubage && (
                        <p className={styles.error}>{errors.cubage.message}</p>
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="moreDetails">Mais detalhes</label>
                      <input
                        id="moreDetails"
                        type="text"
                        {...register("moreDetails")}
                        className={styles.input}
                      />
                      {errors.moreDetails && (
                        <p className={styles.error}>
                          {errors.moreDetails.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Veículo */}
                <section className={styles.section}>
                  <h2>Veículo</h2>
                  <h3>Escolha quantos veículos quiser</h3>
                  <div className={styles.vehicleCheckboxes}>
                    <div className={styles.checkboxColumn}>
                      <h4>Leves</h4>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleLightAll")}
                        />
                        Todos os leves
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleUtilitary")}
                        />
                        Utilitário
                      </label>
                      <label>
                        <input type="checkbox" {...register("vehicle34")} />
                        3/4
                      </label>
                      <label>
                        <input type="checkbox" {...register("vehicleHR")} />
                        HR
                      </label>
                      <label>
                        <input type="checkbox" {...register("vehicleToco")} />
                        Toco
                      </label>
                    </div>
                    <div className={styles.checkboxColumn}>
                      <h4>Médios</h4>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleMediumAll")}
                        />
                        Todos os médios
                      </label>
                      <label>
                        <input type="checkbox" {...register("vehicleTruck")} />
                        Truck
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleBiTruck")}
                        />
                        Bi-truck
                      </label>
                    </div>
                    <div className={styles.checkboxColumn}>
                      <h4>Pesados</h4>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleHeavyAll")}
                        />
                        Todos os pesados
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleCarreta")}
                        />
                        Carreta
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleCarretaTrucada")}
                        />
                        Carreta trucada
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleCarretaLS")}
                        />
                        Carreta LS
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleCarretaVanderleia")}
                        />
                        Carreta Vanderleia
                      </label>
                      <label>
                        <input type="checkbox" {...register("vehicleBitrem")} />
                        Bitrem
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("vehicleRodotrem")}
                        />
                        Rodotrem
                      </label>
                    </div>
                  </div>
                </section>

                {/* Carroceria */}
                <section className={styles.section}>
                  <h2>Carroceria</h2>
                  <h3>Escolha quantas carrocerias quiser</h3>
                  <div className={styles.vehicleCheckboxes}>
                    <div className={styles.checkboxColumn}>
                      <h4>Abertas</h4>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkOpenAll")}
                        />
                        Todas as abertas
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkCarga_seca")}
                        />
                        Carga seca
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkGraneleira")}
                        />
                        Graneleira
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkPlataforma")}
                        />
                        Plataforma
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkPranchaLamina")}
                        />
                        Prancha / Lâmina
                      </label>
                    </div>
                    <div className={styles.checkboxColumn}>
                      <h4>Fechadas</h4>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkClosedAll")}
                        />
                        Todas as fechadas
                      </label>
                      <label>
                        <input type="checkbox" {...register("bodyworkBau")} />
                        Baú
                      </label>
                      <label>
                        <input type="checkbox" {...register("bodyworkSider")} />
                        Sider
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkFrigorifica")}
                        />
                        Frigorífica
                      </label>
                    </div>
                    <div className={styles.checkboxColumn}>
                      <h4>Especiais</h4>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkSpecialAll")}
                        />
                        Todas as especiais
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkCaçamba")}
                        />
                        Caçamba
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkTanque")}
                        />
                        Tanque
                      </label>
                      <label>
                        <input type="checkbox" {...register("bodyworkMunk")} />
                        Munk
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          {...register("bodyworkRollon")}
                        />
                        Roll on Roll off
                      </label>
                    </div>
                  </div>
                </section>

                {/* Tipo de embarque */}
                <section className={styles.section}>
                  <h2>Tipo de embarque</h2>
                  <div className={styles.rowRadioOptions}>
                    <label>
                      <input
                        type="radio"
                        {...register("shippingType")}
                        value="Coleta"
                      />
                      Coleta
                    </label>
                    <label>
                      <input
                        type="radio"
                        {...register("shippingType")}
                        value="Entrega"
                      />
                      Entrega
                    </label>
                    <label>
                      <input
                        type="radio"
                        {...register("shippingType")}
                        value="Ida"
                      />
                      Ida
                    </label>
                    <label>
                      <input
                        type="radio"
                        {...register("shippingType")}
                        value="Volta"
                      />
                      Volta
                    </label>
                  </div>
                  <div className={styles.rowInputs}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="freightValue">Valor do Frete</label>
                      <input
                        type="text"
                        id="freightValue"
                        {...register("freightValue")}
                        className={styles.input}
                        placeholder="R$"
                      />
                      {errors.freightValue && (
                        <p className={styles.errorMessage}>
                          {errors.freightValue.message}
                        </p>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <h2>Pedágio Incluso?</h2>
                      <div className={styles.rowRadioOptions}>
                        <label>
                          <input
                            type="radio"
                            {...register("pedagioIncluso")}
                            value="Sim"
                          />
                          Sim
                        </label>
                        <label>
                          <input
                            type="radio"
                            {...register("pedagioIncluso")}
                            value="Não"
                          />
                          Não
                        </label>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="formaPagamento">
                        Forma de pagamento (opcional)
                      </label>
                      <input
                        type="text"
                        id="formaPagamento"
                        {...register("formaPagamento")}
                        className={styles.input}
                        placeholder="Pix, Depósito, Pamcard, etc..."
                      />
                    </div>
                  </div>
                </section>

                {/* Observações */}
                <section className={styles.section}>
                  <h2>Observações</h2>
                  <div className={styles.inputWrapper}>
                    <textarea
                      id="observations"
                      {...register("observations")}
                      className={styles.textarea}
                      placeholder="Adicione informações relevantes sobre a carga"
                    />
                    {errors.observations && (
                      <p className={styles.error}>
                        {errors.observations.message}
                      </p>
                    )}
                  </div>
                </section>

                <div className={styles.submitWrapper}>
                  <Botao type="submit" text={"Enviar"} />
                  <Botao type="submit" text={"Direcionar para motorista"} />
                </div>
              </form>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CreateFreight;
