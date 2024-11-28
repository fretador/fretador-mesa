// src/hooks/useUpdateOccurrence.ts
import { useMutation } from "@apollo/client";
import { UPDATE_OCCURRENCE } from "@/graphql/mutations/occurrenceMutations";
import { UpdateOccurrenceInput } from "@/utils/Interfaces/UpdateOccurrenceInput";
import { Occurrence } from "@/utils/Interfaces/Occurrence";

interface UpdateOccurrenceData {
	updateOccurrence: Occurrence;
}

interface UpdateOccurrenceVars {
	id: string;
	input: UpdateOccurrenceInput;
}

export const useUpdateOccurrence = () => {
	const [updateOccurrence, { data, loading, error }] = useMutation<
		UpdateOccurrenceData,
		UpdateOccurrenceVars
	>(UPDATE_OCCURRENCE, {
		refetchQueries: ["GetOccurrences"], // Atualiza a lista
		awaitRefetchQueries: true,
	});

	return {
		updateOccurrence,
		data: data?.updateOccurrence,
		loading,
		error,
	};
};
