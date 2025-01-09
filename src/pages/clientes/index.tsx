import React, { useState } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Clientes.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import { Row } from "@/components/Row";
import RowTitle from "@/components/RowTitle";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "@/graphql/queries";
import { Client } from "@/utils/Interfaces/Client";
import { ClientNode } from "@/utils/Interfaces/ClientNode";
import { ClientFilterInput } from "@/utils/Interfaces/ClientFilterInput";
import Loading from "@/components/Loading";
import SmallLoading from "@/components/SmallLoading";

const Clients: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  const [filter, setFilter] = useState<ClientFilterInput>({});

  const handleCardClick = (id: string) => {
    router.push(`/clientes/${id}`);
  };

  const handleSearch = (searchTerm: string) => {
    setFilter({ searchTerm: searchTerm });
  };

  const { loading, error, data } = useQuery(GET_CLIENTS, {
    variables: {
      page: 1,
      limit: 10,
      filter: filter,
    },
    fetchPolicy: "cache-first",
  });

  const clients: Client[] = data?.clients?.edges?.map((edge: ClientNode) => edge.node) || [];

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
              <div className={styles.searchComponents}>
                <SearchComponent onSearch={handleSearch} />
              </div>

              <div className={styles.cards}>
                <RowTitle
                  Cnpj="CNPJ"
                  CorporateName="Razão Social"
                  TradeName="Fantasia"
                  CityState="Cidade-ES"
                  CustomerEmail="E-mail"
                />

                {loading ?
                  <div className={styles.loadingContainer}>
                    <SmallLoading />
                  </div>
                  : error ? (
                    <p>Erro ao carregar clientes: {error.message}</p>
                  ) : (
                    clients.map((client) => (
                      <Row.Root
                        key={client.id}
                        customBackgroundColor="#B2CEDA"
                        onClick={() => handleCardClick(client.id)}
                      >
                        <Row.Cnpj cnpj={client.cnpj} />
                        <Row.CorporateName corporateName={client.corporateName} />
                        <Row.TradeName tradeName={client.tradeName} />
                        <Row.CityState city={client.city} state={client.state} />
                        <Row.CustomerEmail email={client.email} />
                      </Row.Root>
                    ))
                  )}
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Clients;
