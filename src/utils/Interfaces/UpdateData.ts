import { BoardUser } from "./BoardUser";
import { DocumentData } from "./DocumentData";

export interface UpdateData {
	documents?: DocumentData[];
	paymentDate?: String;
	boardUser?: BoardUser;
	name?: String;
	size?: number;
	type?: String;
	mimetype?: String;
	url?: String;
}
