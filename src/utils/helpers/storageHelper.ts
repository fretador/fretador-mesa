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
		sessionStorage.removeItem("boardUser");
	},
};
