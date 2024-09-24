import { gql } from "@apollo/client";

export const UPDATE_FREIGHT_STATUS = gql`
  mutation UpdateFreightStatus($id: ID!, $status: FreightStatusEnum!) {
    updateFreightStatus(id: $id, status: $status) {
      status
    }
  }
`;
