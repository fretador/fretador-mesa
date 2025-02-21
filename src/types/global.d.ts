declare module "react-modal" {
	import { ComponentType } from "react";

	interface ReactModalProps {
		isOpen: boolean;
		onRequestClose?: () => void;
		className?: string | { base: string; afterOpen: string; beforeClose: string };
		overlayClassName?:
			| string
			| { base: string; afterOpen: string; beforeClose: string };
		shouldCloseOnEsc?: boolean;
		shouldCloseOnOverlayClick?: boolean;
		children?: React.ReactNode;
	}

	const ReactModal: ComponentType<ReactModalProps> & {
		setAppElement(appElement: string | HTMLElement): void;
	};

	export default ReactModal;
}
