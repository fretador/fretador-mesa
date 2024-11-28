import { BoardUser } from "./BoardUser";

export interface UpdateData {
	paymentDate?: string;
	boardUser?: BoardUser;
	type?: String;
	name?: String;
	mimetype?: String;
	url?: String;
}
