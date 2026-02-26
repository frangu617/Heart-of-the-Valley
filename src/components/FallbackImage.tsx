"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const WEBP_EXTENSION_PATTERN = /\.webp(\?.*)?$/i;
const JPG_EXTENSION_PATTERN = /\.jpe?g(\?.*)?$/i;

const toJpgPath = (path: string) => path.replace(WEBP_EXTENSION_PATTERN, ".jpg$1");
const toPngPath = (path: string) => path.replace(JPG_EXTENSION_PATTERN, ".png$1");

export default function FallbackImage(props: ImageProps) {
  const { src, onError, ...rest } = props;
  const [resolvedSrc, setResolvedSrc] = useState<ImageProps["src"]>(src);
  const [triedJpgFallback, setTriedJpgFallback] = useState(false);
  const [triedPngFallback, setTriedPngFallback] = useState(false);

  useEffect(() => {
    setResolvedSrc(src);
    setTriedJpgFallback(false);
    setTriedPngFallback(false);
  }, [src]);

  return (
    <NextImage
      {...rest}
      src={resolvedSrc}
      onError={(event) => {
        if (
          !triedJpgFallback &&
          typeof resolvedSrc === "string" &&
          WEBP_EXTENSION_PATTERN.test(resolvedSrc)
        ) {
          setResolvedSrc(toJpgPath(resolvedSrc));
          setTriedJpgFallback(true);
          return;
        }

        if (
          !triedPngFallback &&
          typeof resolvedSrc === "string" &&
          JPG_EXTENSION_PATTERN.test(resolvedSrc)
        ) {
          setResolvedSrc(toPngPath(resolvedSrc));
          setTriedPngFallback(true);
          return;
        }

        onError?.(event);
      }}
    />
  );
}
