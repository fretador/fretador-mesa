import { gql } from "@apollo/client";

export const GET_DOCUMENTS_BY_FREIGHT_ID = gql`
  query GetDocumentsByFreightId($freightId: ID!) {
    getDocumentsByFreightId(freightId: $freightId) {
      id
      name
      type
      url
      sender
      message
      dateOfSubmission
      status
      lastUpdated
    }
  }
`;
