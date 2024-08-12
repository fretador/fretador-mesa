import { BoardUser } from "@/utils/Interfaces/BoardUsers";

const today = "2024-08-09T12:00:00Z";

export const mockBoardUsers: BoardUser[] = [
  {
    id: "1",
    active: true,
    updateDate: today,
    creationDate: "2023-01-01T00:00:00Z",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    profile: "ADMINISTRADOR",
    hashPassword: "$2a$10$abcdefghijklmnopqrstuvwxyz123456",
    profilePicture:
      "https://ui-avatars.com/api/?name=João+Silva&background=random",
  },
  {
    id: "2",
    active: true,
    updateDate: today,
    creationDate: "2023-02-15T00:00:00Z",
    name: "Maria Santos",
    email: "maria.santos@exemplo.com",
    profile: "FINANCEIRO",
    hashPassword: "$2a$10$zyxwvutsrqponmlkjihgfedcba654321",
    profilePicture:
      "https://ui-avatars.com/api/?name=Maria+Santos&background=random",
  },
  {
    id: "3",
    active: true,
    updateDate: today,
    creationDate: "2023-03-30T00:00:00Z",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@exemplo.com",
    profile: "OPERAÇÃO",
    hashPassword: "$2a$10$123456abcdefghijklmnopqrstuvwxyz",
    profilePicture:
      "https://ui-avatars.com/api/?name=Carlos+Oliveira&background=random",
  },
  {
    id: "4",
    active: true,
    updateDate: today,
    creationDate: "2023-04-10T00:00:00Z",
    name: "Ana Rodrigues",
    email: "ana.rodrigues@exemplo.com",
    profile: "CLIENTE",
    hashPassword: "$2a$10$vutsrqponmlkjihgfedcbazyxw654321",
    profilePicture:
      "https://ui-avatars.com/api/?name=Ana+Rodrigues&background=random",
  },
];
