import { BoardUser } from "../Interfaces/BoardUser";

export const storageHelper = {
  saveBoardUser: (boardUser: BoardUser, rememberMe: boolean) => {
    if (typeof window !== "undefined") {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("boardUser", JSON.stringify(boardUser));
    }
  },

  getBoardUserToken: () => {
    if (typeof window !== "undefined") {
      const boardUser = localStorage.getItem("boardUser") || sessionStorage.getItem("boardUser");
      return boardUser ? JSON.parse(boardUser).token : null;
    }
    return null;
  },

  getBoardUser: () => {
    if (typeof window !== "undefined") {
      const boardUser = localStorage.getItem("boardUser") || sessionStorage.getItem("boardUser");
      return boardUser ? JSON.parse(boardUser) : null;
    }
    return null;
  },

  removeBoardUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("boardUser");
      sessionStorage.removeItem("boardUser");
    }
  },
};

export const SESSION_STORAGE_KEYS = {
	PAGE: "freights_page",
	SELECTED_STATUSES: "freights_selected_statuses",
	SEARCH_TERM: "freights_search_term",
};