import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";

export interface EligibleBodywork {
	category: BodyworkCategory;
	type: BodyworkType;
	eligible: boolean;
}
