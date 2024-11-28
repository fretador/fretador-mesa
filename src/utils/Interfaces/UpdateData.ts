import { BoardUser } from "./BoardUser";

export interface UpdateData {
	documents?: [JSON];
	paymentDate?: String;
	boardUser?: BoardUser;
	name?: String;
	size: number;
	type?: String;
	mimetype?: String;
	url?: String;
}
