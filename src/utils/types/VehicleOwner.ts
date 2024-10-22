import { Document} from "./Document";

export interface VehicleOwner {
	email: string;
	document: Document;
	address: string;
	contact: string;
}
