export interface File {
	admin: boolean;
	name: string;
	url: string;
	type: string;
	sender: string;
	createdDate: string; // ISO Date string
	boardUser?: string | null;
}
