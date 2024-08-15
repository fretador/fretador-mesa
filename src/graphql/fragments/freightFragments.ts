import { gql } from "@apollo/client";

export const FREIGHT_FIELDS = gql`
  fragment FreightFields on Freight {
    id
    deliveryAddress
    deliveryDate
    status
    active
    creationDate
    updateDate
  }
`;
