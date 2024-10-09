import { GET_FREIGHTS, GET_FREIGHT_BY_ID } from "@/graphql/queries";
import apolloClient from "@/app/apolloClient";
import { Freight } from "../utils/types/Freight";
import { PageInfo } from "../utils/types/PageInfo";
import { FreightFilters } from "@/utils/types/FreightFilters";
import { GetFreightsResponse } from "../utils/types/GetFreightsResponse";
import { FreightNode } from "@/utils/types/FreightNode";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import { CREATE_FREIGHT, UPDATE_FREIGHT_STATUS } from "@/graphql/mutations";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";

export const FreightService = {
  getFreights: async (filters: FreightFilters, page: number, limit: number) => {
    const response = await apolloClient.query<{
      freights: GetFreightsResponse;
    }>({
      query: GET_FREIGHTS,
      variables: { page, limit, filter: filters },
    });

    if (!response.data || !response.data.freights) {
      throw new Error("Failed to fetch freights");
    }

    return {
      data: response.data.freights.edges.map((edge: FreightNode) => edge.node),
      pageInfo: response.data.freights.pageInfo,
    };
  },

  getFreightById: async (id: string) => {
    const response = await apolloClient.query<{ freight: Freight }>({
      query: GET_FREIGHT_BY_ID,
      variables: { id },
      fetchPolicy: "network-only",
    });

    if (!response.data || !response.data.freight) {
      throw new Error("Failed to fetch freight by ID");
    }

    return response.data.freight;
  },

  transformFreights: (data: Freight[]) => {
    return data;
  },

  transformPageInfo: (pageInfo: PageInfo) => {
    return {
      hasNextPage: pageInfo.hasNextPage,
      hasPreviousPage: pageInfo.hasPreviousPage,
      currentPage: pageInfo.currentPage,
      totalPages: pageInfo.totalPages,
    };
  },

  createFreight: async (input: CreateFreightInput): Promise<Freight> => {
    const response = await apolloClient.mutate<{ createFreight: Freight }>({
      mutation: CREATE_FREIGHT,
      variables: { input },
    });

    if (!response.data || !response.data.createFreight) {
      throw new Error("Failed to create freight");
    }

    return response.data.createFreight;
  },

  updateFreightStatus: async (
    id: string,
    status: FreightStatus,
    updateData: any,
    updateDataType: UpdateDataTypeEnum
  ): Promise<FreightStatus> => {
    const response = await apolloClient.mutate<{
      updateFreightStatus: FreightStatus;
    }>({
      mutation: UPDATE_FREIGHT_STATUS,
      variables: { id, status, updateData, updateDataType },
    });

    if (!response.data || !response.data.updateFreightStatus) {
      throw new Error("Failed to update status freight by ID");
    }

    return response.data.updateFreightStatus;
  },
};
