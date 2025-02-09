import { BodyworkCategory, BodyworkType } from "@/utils/enums/bodyworkEnums";
import { VehicleCategory, VehicleType } from "@/utils/enums/vehicleEnums";

export const generateRandomPlate = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  return `${letters[Math.floor(Math.random() * 26)]}${
    letters[Math.floor(Math.random() * 26)]
  }${letters[Math.floor(Math.random() * 26)]}-${
    numbers[Math.floor(Math.random() * 10)]
  }${letters[Math.floor(Math.random() * 26)]}${
    numbers[Math.floor(Math.random() * 10)]
  }${numbers[Math.floor(Math.random() * 10)]}`;
};

export const generateRandomVehicleData = (cpf: string) => {
  const seed = parseInt(cpf.replace(/\D/g, ""), 10);
  const random = () => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return {
    renavam: Array.from({ length: 11 }, () => Math.floor(random() * 10)).join(
      ""
    ),
    chassi: Array.from({ length: 17 }, () =>
      Math.floor(random() * 36).toString(36)
    )
      .join("")
      .toUpperCase(),
    antt: Array.from({ length: 8 }, () => Math.floor(random() * 10)).join(""),
    tracker: ["Sascar", "Autotrac", "Omnilink", "Onixsat"][
      Math.floor(random() * 4)
    ],
    ownerName: `Empresa ${Math.floor(random() * 1000)} LTDA`,
    ownerDocument: Array.from({ length: 14 }, () =>
      Math.floor(random() * 10)
    ).join(""),
    bodyworkCategory:
      Object.values(BodyworkCategory)[
        Math.floor(random() * Object.values(BodyworkCategory).length)
      ],
    bodyworkType:
      Object.values(BodyworkType)[
        Math.floor(random() * Object.values(BodyworkType).length)
      ],
    vehicleCategory:
      Object.values(VehicleCategory)[
        Math.floor(random() * Object.values(VehicleCategory).length)
      ],
    vehicleType:
      Object.values(VehicleType)[
        Math.floor(random() * Object.values(VehicleType).length)
      ],
  };
};
