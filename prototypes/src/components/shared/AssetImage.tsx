import Image, { type ImageProps } from "next/image";

import { assetPath } from "@/lib/asset-path";

function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src === "string") {
    return assetPath(src);
  }

  return src;
}

export function AssetImage({ src, alt = "", ...props }: ImageProps) {
  return <Image src={resolveSrc(src)} alt={alt} {...props} />;
}
