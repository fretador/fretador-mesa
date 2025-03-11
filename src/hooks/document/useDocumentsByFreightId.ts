import { useQuery } from "@apollo/client";
import { GET_DOCUMENTS_BY_FREIGHT_ID } from "@/graphql/queries/documentQueries";
import { Document } from "@/utils/Interfaces/Document";

interface GetDocumentsByFreightIdData {
	getDocumentsByFreightId: Document[];
}

interface GetDocumentsByFreightIdVars {
	freightId: string;
}

export const useDocumentsByFreightId = (freightId: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetDocumentsByFreightIdData,
		GetDocumentsByFreightIdVars
	>(GET_DOCUMENTS_BY_FREIGHT_ID, {
		variables: { freightId },
		skip: !freightId,
		fetchPolicy: "cache-and-network",
	});

	return {
		data: data?.getDocumentsByFreightId,
		loading,
		error,
		refetch,
	};
};
