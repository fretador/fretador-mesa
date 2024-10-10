import { Photo } from "./Photo";
import { BoardType } from "./Enums";
import { BodyworkCategory, BodyworkType } from "@/utils/enums/bodyworkEnums";
import { VehicleCategory, VehicleType } from "@/utils/enums/vehicleEnums";
export interface Vehicle {
	anttPhoto: Photo;
	documentPhoto: Photo;
	ownedByUser: boolean;
	semiTrailerDocumentPhotos: Photo[];
	semiTrailerPhotos: Photo[];
	type: VehicleType;
	typeByBoard: BoardType;
	vehiclePhoto: Photo;
	plate: string;
	bodyworkCategory: BodyworkCategory;
	bodyworkType: BodyworkType;
	vehicleCategory: VehicleCategory;
	vehicleType: VehicleType;
	ownerName: string;
	ownerDocument: string;
	renavam: string;
	chassi: string;
	antt: string;
	tracker: string;
}
