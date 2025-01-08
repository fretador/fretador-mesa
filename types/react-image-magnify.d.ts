declare module "react-image-magnify" {
	import { ComponentType } from "react";

	interface ReactImageMagnifyProps {
		smallImage: {
			alt: string;
			isFluidWidth: boolean;
			src: string;
			[key: string]: any;
		};
		largeImage: {
			src: string;
			width: number;
			height: number;
		};
		isHintEnabled?: boolean;
		hintTextMouse?: string;
		hintTextTouch?: string;
		[key: string]: any;
	}

	const ReactImageMagnify: ComponentType<ReactImageMagnifyProps>;
	export default ReactImageMagnify;
}
