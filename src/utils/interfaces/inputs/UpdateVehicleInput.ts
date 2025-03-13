import { BodyworkType, BodyworkCategory } from "../../enums/bodyworkEnums";
import { VehicleType, VehicleCategory } from "../../enums/vehicleEnums";
import { UpdatePhotoInput } from "./UpdatePhotoInput";

export interface UpdateVehicleInput {
  anttPhoto?: UpdatePhotoInput;
  documentPhoto?: UpdatePhotoInput;
  ownedByUser?: boolean;
  semiTrailerDocumentPhotos?: UpdatePhotoInput[];
  semiTrailerPhotos?: UpdatePhotoInput[];
  type?: string;
  typeByBoard?: string;
  vehicleType?: VehicleType;
  bodyworkType?: BodyworkType;
  vehiclePhoto?: UpdatePhotoInput;
  vehicleCategory?: VehicleCategory;
  bodyworkCategory?: BodyworkCategory;
  color?: string;
  year?: string;
  docS3?: string;
  plate?: string;
  renavam?: string;
  chassi?: string;
  antt?: string;
  tracker?: boolean;
  trackerBrand?: string;
  ownerName?: string;
  ownerDocument?: string;
}