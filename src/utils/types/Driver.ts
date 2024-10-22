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
	cnh?: string;
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
	city: string;
	state: string;
	email?: string;
	owner?: Owner;
	attachments?: Attachments;
}

export interface Owner {
  _id?: string;
  name: string;
  cpf: string;
  cnh?: string;
  phoneNumber: string;
  email: string;
  pix: string;
  bankName: string;
  bankAgency: string;
  bankAccount: string;
  isDriverAsOwner?: boolean;
}

export interface Attachments {
    anttPhoto?: string;
    cnh?: string;
    documentPhoto?: string;
    proofResidencePhoto?: string;
    rg?: string;
    userPhoto?: string;
    vehiclePhoto?: string;
}