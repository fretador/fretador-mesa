import { FreightDocument } from "./FreightDocument";
import { RequestingUser } from "./RequestingUser";
import { Photo, PhotoHistory } from "./Photo";
import { StatusHistoryItem } from "./StatusHistory";
import { BoardUser } from "./BoardUser";

export interface Freight {
	_id: string;
	id: string;
	active: boolean;
	comment: string | null;
	creationDate: string;
	updateDate: string;
	updateAcknowledge: boolean;
	deliveryAddress: string | null;
	deliveryCep: string | null;
	deliveryCity: string;
	deliveryDate: string | null;
	deliveryDeadline: string;
	deliveryLatitude: string;
	deliveryLongitude: string;
	deliveryState: string;
	deliveryCNPJ: string | null;
	deliveryCorporateName: string | null;
	driver: string;
	elegibleVehicles: string[];
	elegibleTypeByBoards: string[];
	gatheringAddress: string | null;
	gatheringCep: string | null;
	gatheringCity: string;
	gatheringDate: string;
	gatheringDeadline: string;
	gatheringLatitude: string;
	gatheringLongitude: string;
	gatheringState: string;
	gatheringCNPJ: string | null;
	gatheringCorporateName: string | null;
	otherDocuments: FreightDocument[];
	invoicePhoto: string | null;
	invoiceCouponPhotos: Photo[];
	invoiceCouponRejectedPhotos: string | null;
	packageDescription: string;
	packageWeight: number;
	pickupOrderPhoto: string | null;
	requestingUsers: Record<string, RequestingUser>;
	status: string;
	statusWeight: number;
	statusHistory: StatusHistoryItem[];
	toll: boolean;
	travelDistance: number;
	value: string;
	type: string;
	parent: string | null;
	freightCode: number;
	licensePlate: string | null;
	batchItemCode: string | null;
	children: string[];
	requestedPhotoResend: boolean;
	paymentAdvance: number;
	paymentDate: string | null;
	paymentDeadline: number;
	advanceRequestedDate: string | null;
	advancedRequestedPaymentDate: string | null;
	paymentSuccessfulBalance: string;
	clientName: string;
	OSCode: string;
	boardUserCreating: BoardUser;
	boardUserDeleted: string | null;
	freightType: string;
	pdfUrl: string | null;
	invoiceCouponPhotosHistory: PhotoHistory[];
	deliveryLocation: number[];
	gatheringLocation: number[];
	userImages: string | null;
	driverAcknowledge: boolean;
	interestedUsers: string[];
}
