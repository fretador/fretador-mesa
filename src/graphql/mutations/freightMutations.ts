import { gql } from "@apollo/client";

export const CREATE_FREIGHT = gql`
  mutation CreateFreight($input: CreateFreightInput!) {
    createFreight(input: $input) {
      id
      freightCode
      status
    }
  }
`;

export const UPDATE_FREIGHT = gql`
  mutation UpdateFreight($id: ID!, $input: UpdateFreightInput!) {
    updateFreight(id: $id, input: $input) {
      status
      updateDate
    }
  }
`;

export const EDIT_FREIGHT = gql`
  mutation EditFreight($id: ID!, $input: FreightInput!) {
    editFreight(id: $id, input: $input) {
      id
      pickupDeliveryData
      origin
      destination
      cargoLoadType
      needsTarp
      needsTracker
      product
      cargoType
      totalWeight
      volumes
      cubage
      moreDetails
      eligibleVehicles
      eligibleBodyworks
      type
      pedagioIncluso
      formaPagamento
      observations
    }
  }
`;
