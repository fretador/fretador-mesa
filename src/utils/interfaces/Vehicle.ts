import { Photo } from "./Photo";
import { VehicleType, VehicleCategory } from "@/utils/enums/vehicleEnums";
import { BodyworkType, BodyworkCategory } from "@/utils/enums/bodyworkEnums";
export interface Vehicle {
	anttPhoto?: Photo;
	documentPhoto?: Photo;
	ownedByUser?: boolean;
	semiTrailerDocumentPhotos?: Photo[];
	semiTrailerPhotos?: Photo[];
	vehiclePhoto?: Photo;
	vehicleType?: VehicleType;
	type?: VehicleType;
	vehicleCategory: VehicleCategory;
	bodyworkType: BodyworkType;
	bodyworkCategory: BodyworkCategory;
	plate?: string;
	renavam?: string;
	chassi?: string;
	antt?: string;
	tracker?: string;
	ownerName?: string;
	ownerDocument?: string;
}
