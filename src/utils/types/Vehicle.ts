import { Photo } from "./Photo";
import { VehicleType, BoardType } from "./Enums";

export interface Vehicle {
	anttPhoto: Photo;
	documentPhoto: Photo;
	ownedByUser: boolean;
	semiTrailerDocumentPhotos: Photo[];
	semiTrailerPhotos: Photo[];
	type: VehicleType;
	typeByBoard: BoardType;
	vehiclePhoto: Photo;
	plate?: string;
}
