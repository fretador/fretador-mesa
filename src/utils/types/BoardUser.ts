import { BoardUserProfile } from "./Enums";
export interface BoardUser {
	id?: String;
	active?: Boolean;
	creationDate?: String;
	updateDate?: String;
	name: String;
	email: String;
	profile: BoardUserProfile;
	hashPassword?: String;
	socketConnectionIds?: [String];
	profilePicture?: string;
	token: string;
}
