import React from "react";
import Botao from "@/components/Botao";
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

export const mockClients = [
  {
    id: "1",
    cnpj: "12345678000190",
    corporateName: "Empresa ABC LTDA",
    tradeName: "ABC",
    city: "São Paulo",
    state: "SP",
    email: "contato@abc.com.br",
    whatsapp: "11987654321",
    stateRegistration: "123456789",
    address: "Rua das Flores",
    numberAddress: "123",
    neighborhood: "Centro"
  },
  {
    id: "2",
    cnpj: "98765432000199",
    corporateName: "Indústria XYZ S/A",
    tradeName: "XYZ",
    city: "Fortaleza",
    state: "CE",
    email: "contato@xyz.com.br",
    whatsapp: "85987654321",
    stateRegistration: "987654321",
    address: "Avenida Beira Mar",
    numberAddress: "456",
    neighborhood: "Meireles"
  },
  {
    id: "3",
    cnpj: "11222333000144",
    corporateName: "Tech Solutions LTDA",
    tradeName: "TechSol",
    city: "Belo Horizonte",
    state: "MG",
    email: "contato@techsol.com.br",
    whatsapp: "31987654321",
    stateRegistration: "654321987",
    address: "Rua dos Programadores",
    numberAddress: "789",
    neighborhood: "Savassi"
  },
  {
    id: "4",
    cnpj: "22333444000155",
    corporateName: "Alimentos Saúde EIRELI",
    tradeName: "SaúdeAlim",
    city: "Curitiba",
    state: "PR",
    email: "contato@saudealim.com.br",
    whatsapp: "41987654321",
    stateRegistration: "876543219",
    address: "Avenida do Batel",
    numberAddress: "321",
    neighborhood: "Batel"
  },
  {
    id: "5",
    cnpj: "33444555000166",
    corporateName: "Construtora Silva ME",
    tradeName: "SilvaConstrutora",
    city: "Salvador",
    state: "BA",
    email: "contato@silvaconst.com.br",
    whatsapp: "71987654321",
    stateRegistration: "543219876",
    address: "Rua das Obras",
    numberAddress: "654",
    neighborhood: "Pituba"
  },
  {
    id: "6",
    cnpj: "44555666000177",
    corporateName: "Farmácia Vida LTDA",
    tradeName: "Vida Farma",
    city: "Recife",
    state: "PE",
    email: "contato@vidafarma.com.br",
    whatsapp: "81987654321",
    stateRegistration: "321987654",
    address: "Avenida Boa Viagem",
    numberAddress: "987",
    neighborhood: "Boa Viagem"
  },
  {
    id: "7",
    cnpj: "55666777000188",
    corporateName: "Agropecuária Verde Campo S/A",
    tradeName: "VerdeCampo",
    city: "Porto Alegre",
    state: "RS",
    email: "contato@verdecampo.com.br",
    whatsapp: "51987654321",
    stateRegistration: "987321654",
    address: "Estrada do Campo",
    numberAddress: "159",
    neighborhood: "Centro"
  },
  {
    id: "8",
    cnpj: "66777888000199",
    corporateName: "Clínica Saúde Mais LTDA",
    tradeName: "SaúdeMais",
    city: "Brasília",
    state: "DF",
    email: "contato@saudemais.com.br",
    whatsapp: "61987654321",
    stateRegistration: "654123789",
    address: "Setor de Saúde",
    numberAddress: "741",
    neighborhood: "Asa Norte"
  },
  {
    id: "9",
    cnpj: "77888999000111",
    corporateName: "Moda e Estilo EIRELI",
    tradeName: "EstiloFashion",
    city: "Rio de Janeiro",
    state: "RJ",
    email: "contato@estilofashion.com.br",
    whatsapp: "21987654321",
    stateRegistration: "789654123",
    address: "Rua da Moda",
    numberAddress: "852",
    neighborhood: "Ipanema"
  },
  {
    id: "10",
    cnpj: "88999111000122",
    corporateName: "Educação e Saber LTDA",
    tradeName: "SaberEdu",
    city: "Campinas",
    state: "SP",
    email: "contato@saberedu.com.br",
    whatsapp: "19987654321",
    stateRegistration: "987654123",
    address: "Avenida dos Professores",
    numberAddress: "963",
    neighborhood: "Barão Geraldo"
  }
];


const Clients: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  const handleCardClick = (id: string) => {
    router.push(`/clientes/${id}`);
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
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.searchComponents}>
                <SearchComponent onSearch={() => {}} />
              </div>

              <div className={styles.cards}>

                <RowTitle Cnpj="CNPJ" CorporateName="Razão Social" TradeName="Fantasia" CityState="Cidade-ES" CustomerEmail="E-mail" />

                {mockClients
                .map((client) => (
                  <Row.Root
                    key={client.id}
                    customBackgroundColor="#B2CEDA"
                    onClick={() => handleCardClick(client.id)}
                  >
                    <Row.Cnpj cnpj={client.cnpj} />
                    <Row.CorporateName corporateName={client.corporateName} />
                    <Row.TradeName tradeName={client.tradeName} />
                    <Row.CityState city={client.city} state={client.state} />
                    <Row.CustomerEmail email={client.email}  />
                  </Row.Root>
                ))}

              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Clients;
