// src/components/CustomImage.tsx
import Image, { ImageProps, StaticImageData } from "next/image";
import { useState, useEffect } from "react";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src);

  useEffect(() => {
    if (typeof src === "string" && src.startsWith("@")) {
      // Se começa com '@', assume que é um import e usa diretamente
      setImageSrc(src);
    } else if (typeof src === "string" && !src.startsWith("/")) {
      // Se não começa com '/', assume que é um caminho relativo e adiciona '/'
      setImageSrc(`/${src}`);
    } else {
      // Caso contrário, usa o src como está
      setImageSrc(src);
    }
  }, [src]);

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} src={imageSrc} />;
};

export default CustomImage;
