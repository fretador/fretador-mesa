import { Photo } from "./Photo";
import { Vehicle } from "./Vehicle";
import { VehicleOwner } from "./VehicleOwner";
import { Wallet } from "./Wallet";
import { DriverStatus } from "./Enums";
import { StatusHistoryItem } from "./StatusHistory";
import { RequestedFreightItem } from "./RequestedFreightItem";

export interface Driver {
	_id: string;
	active: boolean;
	cnhPhoto: Photo;
	cpf: string;
	creationDate: string;
	updateDate: string;
	id: string;
	name: string;
	password: string;
	rgPhoto: Photo;
	phoneNumber: string;
	phoneNumberSecondary: string;
	proofResidencePhoto: Photo;
	requestedFreights: RequestedFreightItem[];
	status: DriverStatus;
	notificationToken: string[];
	statusHistory: StatusHistoryItem[];
	userPhoto: Photo;
	vehicle: Vehicle;
	vehicleOwner: VehicleOwner;
	wallet: Wallet;
	validated: boolean;
	acknowledge: boolean;
	updateAcknowledge: boolean;
	hashPassword: string;
	invoiceCouponPhotos: Photo[];
	invoicePhoto: Photo;
	pickupOrderPhoto: Photo;
	favoriteFreights: string[];
}
