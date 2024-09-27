import apolloClient from "@/app/apolloClient";
import {
  GET_DRIVERS_QUERY,
  GET_DRIVER_BY_ID,
} from "@/graphql/queries/driverQueries";
import { Driver } from "@/utils/types/Driver";
import { PageInfo } from "@/utils/types/PageInfo";
import { GetDriversResponse } from "@/utils/types/GetDriversResponse";
import { DriverFilters } from "@/utils/types/DriverFilters";
import { DriverNode } from "@/utils/types/DriverNode";

const bancosBrasileiros = [
  "Banco do Brasil",
  "Caixa Econômica Federal",
  "Bradesco",
  "Itaú Unibanco",
  "Santander",
  "Nubank",
  "Inter",
  "Banco Original",
  "Banco Pan",
  "BTG Pactual",
  "Banco Safra",
  "Banco C6",
  "Banco BS2",
  "Banco Neon",
  "Banco Next",
];

function selecionarBancoAleatorio(): string {
  const indiceAleatorio = Math.floor(Math.random() * bancosBrasileiros.length);
  return bancosBrasileiros[indiceAleatorio];
}

function gerarDadosBancarios(cpf: string): {
  agencia: string;
  conta: string;
  banco: string;
} {
  // Remove caracteres não numéricos do CPF
  const cpfLimpo = cpf.replace(/\D/g, "");

  // Gera número da agência (4 dígitos)
  const agencia = cpfLimpo.slice(0, 4).padStart(4, "0");

  // Gera número da conta (8 dígitos + 1 dígito verificador)
  const contaSemDigito = cpfLimpo.slice(4, 12).padStart(8, "0");
  const digitoVerificador = (parseInt(contaSemDigito) % 9).toString();
  const conta = `${contaSemDigito}-${digitoVerificador}`;

  // Seleciona um banco aleatório
  const banco = selecionarBancoAleatorio();

  return { agencia, conta, banco };
}

export const DriverService = {
  getDrivers: async (page: number, limit: number, filter: DriverFilters) => {
    const response = await apolloClient.query<{ drivers: GetDriversResponse }>({
      query: GET_DRIVERS_QUERY,
      variables: { page, limit, filter },
    });

    if (!response.data || !response.data.drivers) {
      throw new Error("Failed to fetch drivers");
    }

    return {
      data: response.data.drivers.edges.map((edge: DriverNode) => edge.node),
      pageInfo: response.data.drivers.pageInfo,
    };
  },

  getDriverById: async (id: string) => {
    const response = await apolloClient.query<{ driver: Driver }>({
      query: GET_DRIVER_BY_ID,
      variables: { id },
    });

    if (!response.data || !response.data.driver) {
      throw new Error("Failed to fetch driver by ID");
    }

    return response.data.driver;
  },

  transformDrivers: (data: Driver[]) => {
    return data.map((driver) => {
      const firstName = driver.name.split(" ")[0].toLowerCase();
      const generatedEmail = `${firstName}@fretador.com.br`;
      const { agencia, conta, banco } = gerarDadosBancarios(driver.cpf);

      return {
        ...driver,
        email: driver.email || generatedEmail,
        owner: {
          name: driver.name,
          cpf: driver.cpf,
          phoneNumber: driver.phoneNumber,
          email: generatedEmail,
          bankName: banco,
          bankAgency: agencia,
          bankAccount: conta,
          pix: driver.email || generatedEmail,
          isDriverAsOwner: true,
        },
        attachments: {
          userPhoto: driver.userPhoto?.imageUrl,
          cnh: driver.cnhPhoto?.imageUrl,
          proofResidencePhoto: driver.proofResidencePhoto?.imageUrl,
          rg: driver.rgPhoto?.imageUrl,
          vehiclePhoto: driver.vehicle?.vehiclePhoto?.imageUrl,
          anttPhoto: driver.vehicle?.anttPhoto?.imageUrl,
          documentPhoto: driver.vehicle?.documentPhoto?.imageUrl,
          // semiTrailerDocumentPhotos: driver.vehicle?.semiTrailerDocumentPhotos,
          // semiTrailerPhotos: driver.vehicle?.semiTrailerPhotos,
        },
      };
    });
  },

  transformPageInfo: (pageInfo: PageInfo) => {
    return {
      hasNextPage: pageInfo.hasNextPage,
      hasPreviousPage: pageInfo.hasPreviousPage,
      currentPage: pageInfo.currentPage,
      totalPages: pageInfo.totalPages,
    };
  },
};
