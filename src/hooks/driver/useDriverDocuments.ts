import { useDriverById } from "@/hooks/driver/useDriverById";
import { DriverDocumentFieldEnum } from "@/utils/enums/driverDocumentFieldEnum";
import { PhotoStatus } from "@/utils/enums/photoStatusEnums";
import { useMemo } from "react";

interface DriverDocument {
	id: string;
	field: DriverDocumentFieldEnum;
	imageUrl: string;
	alt: string;
	status: PhotoStatus;
	message?: string;
	sender?: string;
}

export const useDriverDocuments = (driverId: string) => {
	const { data: driver, loading, error, refetch } = useDriverById(driverId);

	const documents = useMemo<DriverDocument[]>(() => {
		if (!driver) return [];

		return [
			{
				id: "userPhoto",
				field: DriverDocumentFieldEnum.USER_PHOTO,
				imageUrl: driver.userPhoto?.imageUrl || "",
				alt: "Foto de Perfil",
				status: driver.userPhoto?.status || PhotoStatus.WAITING,
				message: driver.userPhoto?.message,
				sender: driver.userPhoto?.sender,
			},
			{
				id: "cnhPhoto",
				field: DriverDocumentFieldEnum.CNH_PHOTO,
				imageUrl: driver.cnhPhoto?.imageUrl || "",
				alt: "CNH",
				status: driver.cnhPhoto?.status || PhotoStatus.WAITING,
				message: driver.cnhPhoto?.message,
				sender: driver.cnhPhoto?.sender,
			},
			{
				id: "rgPhoto",
				field: DriverDocumentFieldEnum.RG_PHOTO,
				imageUrl: driver.rgPhoto?.imageUrl || "",
				alt: "RG",
				status: driver.rgPhoto?.status || PhotoStatus.WAITING,
				message: driver.rgPhoto?.message,
				sender: driver.rgPhoto?.sender,
			},
			{
				id: "proofResidence",
				field: DriverDocumentFieldEnum.PROOF_RESIDENCE,
				imageUrl: driver.proofResidencePhoto?.imageUrl || "",
				alt: "Comprovante de Residência",
				status: driver.proofResidencePhoto?.status || PhotoStatus.WAITING,
				message: driver.proofResidencePhoto?.message,
				sender: driver.proofResidencePhoto?.sender,
			},
			{
				id: "vehicleDocument",
				field: DriverDocumentFieldEnum.VEHICLE_DOCUMENT,
				imageUrl: driver.vehicle?.documentPhoto?.imageUrl || "",
				alt: "Documento do Veículo",
				status: driver.vehicle?.documentPhoto?.status || PhotoStatus.WAITING,
				message: driver.vehicle?.documentPhoto?.message,
				sender: driver.vehicle?.documentPhoto?.sender,
			},
			{
				id: "vehiclePhoto",
				field: DriverDocumentFieldEnum.VEHICLE_PHOTO,
				imageUrl: driver.vehicle?.vehiclePhoto?.imageUrl || "",
				alt: "Foto do Veículo",
				status: driver.vehicle?.vehiclePhoto?.status || PhotoStatus.WAITING,
				message: driver.vehicle?.vehiclePhoto?.message,
				sender: driver.vehicle?.vehiclePhoto?.sender,
			},
			{
				id: "anttPhoto",
				field: DriverDocumentFieldEnum.ANTT_PHOTO,
				imageUrl: driver.vehicle?.anttPhoto?.imageUrl || "",
				alt: "Foto do ANTT",
				status: driver.vehicle?.anttPhoto?.status || PhotoStatus.WAITING,
				message: driver.vehicle?.anttPhoto?.message,
				sender: driver.vehicle?.anttPhoto?.sender,
			}
		].filter((doc) => doc.imageUrl);
	}, [driver]);

	return { documents, loading, error, refetch };
};
