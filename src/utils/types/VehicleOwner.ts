import { DriverDocument } from "./DriverDocument";

export interface VehicleOwner {
	email: string;
	document: DriverDocument;
	address: string;
	contact: string;
}
