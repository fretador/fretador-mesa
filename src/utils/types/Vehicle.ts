import { Photo } from "./Photo";
import { VehicleType, BoardType } from "./Enums";
import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";
import { VehicleCategory } from "../enums/vehicleEnums";

export interface Vehicle {
	anttPhoto: Photo;
	documentPhoto: Photo;
	ownedByUser: boolean;
	semiTrailerDocumentPhotos: Photo[];
	semiTrailerPhotos: Photo[];
	vehiclePhoto: Photo;
	type: VehicleType;
	vehicleType: VehicleType;
	vehicleCategory: VehicleCategory;
	typeByBoard: BoardType;
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
