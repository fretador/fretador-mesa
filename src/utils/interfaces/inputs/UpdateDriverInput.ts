import { DriverStatus } from "../../enums/driverStatusEnums";
import { DriverAddressInput } from "./DriverAddressInput";
import { UpdatePhotoInput } from "./UpdatePhotoInput";
import { UpdateVehicleInput } from "./UpdateVehicleInput";
import { UpdateVehicleOwnerInput } from "./UpdateVehicleOwnerInput";
import { UpdateWalletInput } from "./UpdateWalletInput";

export interface UpdateDriverInput {
	cpf: string;
	active?: boolean;
	cnh?: string;
	name?: string;
	phoneNumber?: string;
	phoneNumberSecondary?: string;
	status?: DriverStatus;
	email?: string;
	vehicle?: UpdateVehicleInput;
	vehicleOwner?: UpdateVehicleOwnerInput;
	wallet?: UpdateWalletInput;
	address?: DriverAddressInput;
	userPhoto?: UpdatePhotoInput;
}