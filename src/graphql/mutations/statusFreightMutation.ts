import { gql } from "@apollo/client";

export const UPDATE_FREIGHT_STATUS = gql`
  mutation UpdateFreightStatus(
    $id: ID!
    $status: FreightStatus!
    $updateData: JSON!
    $updateDataType: UpdateDataTypeEnum!
  ) {
    updateFreightStatus(
      id: $id
      status: $status
      updateData: $updateData
      updateDataType: $updateDataType
    ) {
      status
    }
  }
`;
