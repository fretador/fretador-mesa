import { gql } from "@apollo/client";

export const ADD_DOCUMENTS_TO_FREIGHT = gql`
  mutation AddDocumentsToFreight($freightId: ID!, $documents: [DocumentInput!]!) {
    addDocumentsToFreight(freightId: $freightId, documents: $documents) {
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

export const REMOVE_DOCUMENTS_FROM_FREIGHT = gql`
  mutation RemoveDocumentsFromFreight($freightId: ID!, $documentIds: [ID!]!) {
    removeDocumentsFromFreight(freightId: $freightId, documentIds: $documentIds) {
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

export const UPDATE_DOCUMENTS = gql`
  mutation UpdateDocuments($freightId: ID!, $documentUpdates: [DocumentUpdateInput!]!) {
    UpdateDocuments(freightId: $freightId, documentUpdates: $documentUpdates) {
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

export const GENERATE_SIGNED_URL = gql`
	mutation GenerateSignedUrl($fileName: String!, $fileType: String!) {
		generateSignedUrl(fileName: $fileName, fileType: $fileType) {
			fileUrl
			signedUrl
		}
	}
`;