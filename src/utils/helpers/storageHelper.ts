import { BoardUser } from "../types/BoardUser";

export const storageHelper = {
	saveBoardUser: (boardUser: BoardUser) => {
		if (typeof window !== "undefined") {
			sessionStorage.setItem("boardUser", JSON.stringify(boardUser));
		}
	},

	getBoardUserToken: () => {
		if (typeof window !== "undefined") {
			const boardUser = sessionStorage.getItem("boardUser");
			return boardUser ? JSON.parse(boardUser).token : null;
		}
		return null;
	},

	getBoardUser: () => {
		if (typeof window !== "undefined") {
			const boardUser = sessionStorage.getItem("boardUser");
			return boardUser ? JSON.parse(boardUser) : null;
		}
		return null;
	},

	removeBoardUser: () => {
		if (typeof window !== "undefined") {
			sessionStorage.removeItem("boardUser");
		}
	},
};

