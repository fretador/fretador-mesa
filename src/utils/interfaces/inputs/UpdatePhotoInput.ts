import { PhotoStatus } from "../../enums/photoStatusEnums";

export interface UpdatePhotoInput {
	imageUrl?: string;
	thumbnailUrl?: string;
	message?: string;
	sender?: string;
	status?: PhotoStatus;
}
