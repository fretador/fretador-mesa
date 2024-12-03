import { useMutation } from "@apollo/client";
import { DELETE_OCCURRENCE } from "@/graphql/mutations/occurrenceMutations";

interface DeleteOccurrenceData {
	deleteOccurrence: boolean;
}

interface DeleteOccurrenceVars {
	id: string;
}

export const useDeleteOccurrence = () => {
	const [deleteOccurrence, { data, loading, error }] = useMutation<
		DeleteOccurrenceData,
		DeleteOccurrenceVars
	>(DELETE_OCCURRENCE, {
		refetchQueries: ["GetOccurrences"], // Atualiza a lista após a deleção
		awaitRefetchQueries: true,
	});

	return {
		deleteOccurrence,
		data: data?.deleteOccurrence,
		loading,
		error,
	};
};
