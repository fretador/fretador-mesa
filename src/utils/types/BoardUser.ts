import { BoardUserProfile } from "./Enums";
export interface BoardUser {
	_id: String;
	id: String;
	active: Boolean;
	updateDate: String;
	creationDate: String;
	name: String;
	email: String;
	profile: BoardUserProfile;
	hashPassword: String;
	socketConnectionIds: [String];
}
