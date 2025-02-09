import { useMutation } from "@apollo/client";
import { CREATE_OCCURRENCE } from "@/graphql/mutations/occurrenceMutations";
import { CreateOccurrenceInput } from "@/utils/Interfaces/CreateOccurrenceInput";
import { Occurrence } from "@/utils/Interfaces/Occurrence";

interface CreateOccurrenceData {
	createOccurrence: Occurrence;
}

interface CreateOccurrenceVars {
	input: CreateOccurrenceInput;
}

export const useCreateOccurrence = () => {
	const [createOccurrence, { data, loading, error }] = useMutation<
		CreateOccurrenceData,
		CreateOccurrenceVars
	>(CREATE_OCCURRENCE, {
		refetchQueries: ["GetOccurrences"], // Atualiza a lista após a criação
		awaitRefetchQueries: false,
	});

	return {
		createOccurrence,
		data: data?.createOccurrence,
		loading,
		error,
	};
};
