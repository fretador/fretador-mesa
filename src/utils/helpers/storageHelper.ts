import { BoardUser } from "../types/BoardUser";

export const storageHelper = {
	saveBoardUser: (boardUser: BoardUser) => {
		sessionStorage.setItem("boardUser", JSON.stringify(boardUser));
	},

	getBoardUserToken: () => {
		const boardUser = sessionStorage.getItem("boardUser");
		return boardUser ? JSON.parse(boardUser).token : null;
	},

	getBoardUser: () => {
		const boardUser = sessionStorage.getItem("boardUser");
		return boardUser ? JSON.parse(boardUser) : null;
	},

	removeBoardUser: () => {
		if (typeof window !== "undefined") { // Verifica se está no ambiente do navegador
			sessionStorage.removeItem("boardUser");
		}
	},
};
