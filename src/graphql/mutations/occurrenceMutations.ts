import { gql } from "@apollo/client";
import {
	OCCURRENCE_FULL_FIELDS,
} from "../fragments/occurrenceFragments";

export const CREATE_OCCURRENCE = gql`
	mutation CreateOccurrence($input: CreateOccurrenceInput!) {
		createOccurrence(input: $input) {
			...OccurrenceFullFields
		}
	}
	${OCCURRENCE_FULL_FIELDS}
`;

export const UPDATE_OCCURRENCE = gql`
	mutation UpdateOccurrence($id: ID!, $input: UpdateOccurrenceInput!) {
		updateOccurrence(id: $id, input: $input) {
			...OccurrenceFullFields
		}
	}
	${OCCURRENCE_FULL_FIELDS}
`;

export const DELETE_OCCURRENCE = gql`
	mutation DeleteOccurrence($id: ID!) {
		deleteOccurrence(id: $id)
	}
`;
