import { gql } from "@apollo/client";

export const UPDATE_STATUS_FINANCIAL_FREIGHT = gql`
	mutation UpdateStatusFinancialFreight(
		$id: ID!
		$input: UpdateStatusFinancialFreightInput!
	) {
		updateStatusFinancialFreight(id: $id, input: $input) {
			status
			advanceValue
			advancePaymentDate
			advanceRequestedDate
			balanceValue
			balancePaymentDate
			balanceRequestedDate
			value
			paymentDate
			paymentRequestedDate
		}
	}
`;

export const UPDATE_FINANCIAL_FREIGHT = gql`
	mutation UpdateFinancialFreight(
		$id: ID!
		$input: UpdateFinancialFreightInput!
	) {
		updateFinancialFreight(id: $id, input: $input) {
			status
			updateDate
		}
	}
`;
