export interface Message {
	message: string;
	boardUser?: string | null;
	admin?: boolean | null;
	createdDate: string; // ISO Date string
}
