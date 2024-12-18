// src/components/CustomImage.tsx
import Image, { ImageProps, StaticImageData } from "next/image";
import { useState, useEffect } from "react";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src);

  useEffect(() => {
    if (typeof src !== "string") {
      // src é um objeto StaticImageData importado (imagens locais via import)
      setImageSrc(src);
    } else {
      // src é string
      // Se já é uma URL absoluta (http/https), caminho absoluto (/), ou data URL, usa como está
      if (
        src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("/") ||
        src.startsWith("data:image")
      ) {
        setImageSrc(src);
      } else {
        // Caso seja um caminho relativo sem barra inicial, adicionamos '/'
        setImageSrc(`/${src}`);
      }
    }
  }, [src]);

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} src={imageSrc} />;
};

export default CustomImage;
