export interface BoardUser {
  id: string;
  active: boolean;
  updateDate: string;
  creationDate: string;
  name: string;
  email: string;
  profile: string;
  hashPassword: string;
  profilePicture?: string;
}
