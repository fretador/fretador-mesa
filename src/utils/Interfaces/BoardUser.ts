import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";
export interface BoardUser {
	id?: String;
	active?: Boolean;
	creationDate?: String;
	updateDate?: String;
	name?: String;
	email?: String;
	profile?: BoardUserProfile;
	hashPassword?: String;
	socketConnectionIds?: [String];
	profilePicture?: string;
	token?: string;
}