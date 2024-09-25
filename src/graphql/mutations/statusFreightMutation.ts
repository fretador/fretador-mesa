import { gql } from "@apollo/client";

export const UPDATE_FREIGHT_STATUS = gql`
  mutation UpdateFreightStatus(
    $id: ID!
    $status: FreightStatusEnum!
    $updateData: JSON!
  ) {
    updateFreightStatus(id: $id, status: $status, updateData: $updateData) {
      status
    }
  }
`;
