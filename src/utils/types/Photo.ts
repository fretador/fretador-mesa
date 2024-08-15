import { PhotoStatus } from "./Enums";

export interface Photo {
	imageUrl: string;
	thumbnailUrl?: string;
	message: string;
	sender?: string;
	status: PhotoStatus;
}

export interface PhotoHistory {
	imageUrl: string;
	message: string;
	sender: string;
	status: string;
	updatedAt: string;
}
