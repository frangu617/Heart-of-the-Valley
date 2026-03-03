"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const WEBP_EXTENSION_PATTERN = /\.webp(\?.*)?$/i;
const JPG_EXTENSION_PATTERN = /\.jpe?g(\?.*)?$/i;
const PNG_EXTENSION_PATTERN = /\.png(\?.*)?$/i;

const toJpgPath = (path: string) =>
  path
    .replace(WEBP_EXTENSION_PATTERN, ".jpg$1")
    .replace(PNG_EXTENSION_PATTERN, ".jpg$1");
const toPngPath = (path: string) =>
  path
    .replace(WEBP_EXTENSION_PATTERN, ".png$1")
    .replace(JPG_EXTENSION_PATTERN, ".png$1");
const toWebpPath = (path: string) =>
  path
    .replace(JPG_EXTENSION_PATTERN, ".webp$1")
    .replace(PNG_EXTENSION_PATTERN, ".webp$1");

const buildFallbackCandidates = (path: string): string[] => {
  const candidates: string[] = [];

  if (WEBP_EXTENSION_PATTERN.test(path)) {
    candidates.push(toPngPath(path), toJpgPath(path));
  } else if (JPG_EXTENSION_PATTERN.test(path)) {
    candidates.push(toPngPath(path), toWebpPath(path));
  } else if (PNG_EXTENSION_PATTERN.test(path)) {
    candidates.push(toWebpPath(path), toJpgPath(path));
  }

  return candidates.filter(
    (candidate, index, allCandidates) =>
      candidate !== path && allCandidates.indexOf(candidate) === index,
  );
};

export default function FallbackImage(props: ImageProps) {
  const { src, onError, unoptimized, ...rest } = props;
  const fallbackCandidates = useMemo(
    () => (typeof src === "string" ? buildFallbackCandidates(src) : []),
    [src],
  );
  const sourceCandidates = useMemo<ImageProps["src"][]>(
    () => [src, ...fallbackCandidates],
    [src, fallbackCandidates],
  );
  const [candidateIndex, setCandidateIndex] = useState(0);
  const candidateIndexRef = useRef(0);
  const resolvedSrc =
    sourceCandidates[Math.min(candidateIndex, sourceCandidates.length - 1)] ?? src;
  const srcKey = typeof src === "string" ? src : "static-image";
  const shouldBypassOptimization =
    typeof resolvedSrc === "string" &&
    resolvedSrc.startsWith("/images/characters/");

  useEffect(() => {
    setCandidateIndex(0);
    candidateIndexRef.current = 0;
  }, [srcKey]);

  useEffect(() => {
    candidateIndexRef.current = candidateIndex;
  }, [candidateIndex]);

  return (
    <NextImage
      key={srcKey}
      {...rest}
      src={resolvedSrc}
      unoptimized={unoptimized ?? shouldBypassOptimization}
      onError={(event) => {
        if (candidateIndexRef.current < sourceCandidates.length - 1) {
          setCandidateIndex((previousIndex) =>
            Math.min(previousIndex + 1, sourceCandidates.length - 1),
          );
          return;
        }

        onError?.(event);
      }}
    />
  );
}
