import { UserDocument } from "./UserDocument";

export interface VehicleOwner {
	email: string;
	document: UserDocument;
	address: string;
	contact: string;
}
