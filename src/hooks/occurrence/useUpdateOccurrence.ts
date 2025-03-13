import { useMutation } from "@apollo/client";
import { UPDATE_OCCURRENCE } from "@/graphql/mutations/occurrenceMutations";
import { UpdateOccurrenceInput } from "@/utils/interfaces/inputs/UpdateOccurrenceInput";
import { Occurrence } from "@/utils/interfaces/Occurrence";
import { GET_OCCURRENCE_BY_ID } from "../../graphql/queries/occurrenceQueries";

interface UpdateOccurrenceData {
	updateOccurrence: Occurrence;
}

interface UpdateOccurrenceVars {
	id: string;
	input: UpdateOccurrenceInput;
}

export const useUpdateOccurrence = (occurrenceId: string) => {
	const [updateOccurrence, { data, loading, error }] = useMutation<
		UpdateOccurrenceData,
		UpdateOccurrenceVars
	>(UPDATE_OCCURRENCE, {
		refetchQueries: [
			"GetOccurrences", // mantém a refetch da lista de fretes
			{ query: GET_OCCURRENCE_BY_ID, variables: { id: occurrenceId } }, // refetch apenas do frete específico
		],
		awaitRefetchQueries: false,
	});

	return {
		updateOccurrence,
		data: data?.updateOccurrence,
		loading,
		error,
	};
};
