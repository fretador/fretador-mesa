import { Freight } from "./Freight";
import { BoardUser } from "./BoardUser";
import { DocumentData } from "./DocumentData";

export interface UpdateData {
	freight?: Partial<Freight>;
	documents?: DocumentData[];
	boardUser?: BoardUser;
	name?: string;
	size?: number;
	type?: string;
	mimetype?: string;
	url?: string;
}
