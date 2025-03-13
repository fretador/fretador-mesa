import { BoardUser } from "@/utils/interfaces/BoardUser";
import { BoardUserProfile } from "../enums/boardUserProfileEnums";

const today = "2024-08-09T12:00:00Z";
const defaultAvatarPath = "../../assets/src/images/avatar.png";
export const mockBoardUsers: BoardUser[] = [
	{
		id: "1",
		active: true,
		updateDate: today,
		creationDate: "2023-01-01T00:00:00Z",
		name: "Zé do Frete",
		email: "joao.silva@exemplo.com",
		profile: BoardUserProfile.ADMINISTRADOR,
		hashPassword: "$2a$10$abcdefghijklmnopqrstuvwxyz123456",
		profilePicture: defaultAvatarPath,
	},
	{
		id: "2",
		active: true,
		updateDate: today,
		creationDate: "2023-02-15T00:00:00Z",
		name: "Maria Santos",
		email: "maria.santos@exemplo.com",
		profile: BoardUserProfile.FINANCEIRO,
		hashPassword: "$2a$10$zyxwvutsrqponmlkjihgfedcba654321",
		profilePicture: defaultAvatarPath,
	},
	{
		id: "3",
		active: true,
		updateDate: today,
		creationDate: "2023-03-30T00:00:00Z",
		name: "Carlos Oliveira",
		email: "carlos.oliveira@exemplo.com",
		profile: BoardUserProfile.OPERACAO,
		hashPassword: "$2a$10$123456abcdefghijklmnopqrstuvwxyz",
		profilePicture: defaultAvatarPath,
	},
	{
		id: "4",
		active: true,
		updateDate: today,
		creationDate: "2023-04-10T00:00:00Z",
		name: "Ana Rodrigues",
		email: "ana.rodrigues@exemplo.com",
		profile: BoardUserProfile.SAC,
		hashPassword: "$2a$10$vutsrqponmlkjihgfedcbazyxw654321",
		profilePicture: defaultAvatarPath,
	},
];
