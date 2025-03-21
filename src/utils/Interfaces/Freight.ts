import { Document } from "./Document";
import { RequestingDriver } from "./RequestingDriver";
import { Photo, PhotoHistory } from "./Photo";
import { StatusHistoryItem } from "./StatusHistory";
import { BoardUser } from "./BoardUser";
import { Driver } from "./Driver";
import { Type } from "../enums/typeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { ShippingType } from "../enums/shippingTypeEnum";
import { FreightStatus } from "../enums/freightStatusEnum";
import { VehicleType } from "../enums/vehicleEnums";
import { BodyworkType } from "../enums/bodyworkEnums";
import { RequestFinancialType } from "../enums/requestFinancialTypeEnum";
import { OwnershipHistory } from "./OwnershipHistory";

export interface Freight {
	_id?: string;
	id?: string;
	active?: boolean;
	comment?: string;
	creationDate?: string;
	updateDate?: string;
	updateAcknowledge?: boolean;
	origin?: string;
	originCNPJ?: string;
	originRazaoSocial?: string;
	originEndereco?: string;
	destination?: string;
	destinationCNPJ?: string;
	destinationRazaoSocial?: string;
	destinationEndereco?: string;
	pickupDeliveryData?: string;
	cargoLoadType?: CargoLoadType;
	needsTarp?: boolean;
	needsTracker?: boolean;
	product?: string;
	cargoType?: CargoType;
	totalWeight?: number;
	volumes?: number;
	cubage?: number;
	moreDetails?: string;
	packageDescription?: string;
	packageWeight?: number;
	observations?: string;
	shippingType?: ShippingType;
	pedagioIncluso?: boolean;
	formaPagamento?: string;
	eligibleVehicles?: VehicleType[];
	elegibleVehicles?: string[];
	eligibleBodyworks?: BodyworkType[];
	elegibleTypeByBoards?: string[];
	type?: Type;
	targetedDrivers: Driver[];
	driver?: string;
	driverName?: string;
	licensePlate?: string;
	status?: FreightStatus;
	statusWeight?: number;
	statusHistory?: StatusHistoryItem[];
	freightCode?: number;
	pickupOrderPhoto?: string;
	invoicePhoto?: string;
	invoiceCouponDocs?: Photo[];
	invoiceCouponPhotos?: Photo[];
	invoiceCouponRejectedPhotos?: Photo[];
	documents?: Document[];
	otherDocuments?: Document[];
	deliveryAddress?: string;
	deliveryCep?: string;
	deliveryCity?: string;
	deliveryDate?: string;
	deliveryDeadline?: string;
	deliveryLatitude?: string;
	deliveryLongitude?: string;
	deliveryState?: string;
	deliveryCNPJ?: string;
	deliveryCorporateName?: string;
	deliveryLocation?: number[];
	gatheringAddress?: string;
	gatheringCep?: string;
	gatheringCity?: string;
	gatheringDate?: string;
	gatheringDeadline?: string;
	gatheringLatitude?: string;
	gatheringLongitude?: string;
	gatheringState?: string;
	gatheringCNPJ?: string;
	gatheringCorporateName?: string;
	gatheringLocation?: number[];
	clientName?: string;
	client?: string;
	requestingUsers?: Record<string, RequestingDriver>;
	interestedUsers?: string[];
	requestedPhotoResend?: boolean;
	userImages?: string;
	driverAcknowledge?: boolean;
	numCte?: string;
	parent?: string;
	children?: string[];
	batchItemCode?: string;
	paymentAdvance?: number;
	paymentDeadline?: number;
	advancedRequestedPaymentDate?: string;
	paymentSuccessfulBalance?: string;
	OSCode?: string;
	boardUser?: BoardUser;
	boardUserCreating?: BoardUser;
	boardUserDeleted?: string;
	freightType?: string;
	pdfUrl?: string;
	invoiceCouponPhotosHistory?: PhotoHistory[];
	travelDistance?: number;
	toll?: boolean;
	contractNumber: string;
	// TODO: ajustar tipo de pagamento, se necessário criar objeto para melhor controle dos pagamentos
	requestFinancialType?: RequestFinancialType;
	paymentType?: RequestFinancialType | "";
	advanceValue?: number;
	advanceRequestedDate?: string;
	advancePaymentDate?: string;
	balanceValue?: number;
	balanceRequestedDate?: string;
	balancePaymentDate?: string;
	value?: number;
	paymentRequestedDate?: string;
	paymentDate?: string;

	// Novos campos
	currentOwner?: BoardUser;
	ownershipHistory?: OwnershipHistory[];
}