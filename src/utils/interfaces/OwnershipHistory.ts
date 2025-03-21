import { BoardUser } from "./BoardUser";

export interface OwnershipHistory {
	user?: BoardUser;
	action?: string;
	updateDate?: string;
}
