type ImageManifest = {
  generatedAt?: string;
  count?: number;
  images?: string[];
};

type PreloadImageManifestOptions = {
  manifestPath?: string;
  maxConcurrent?: number;
};

const DEFAULT_MANIFEST_PATH = "/image-manifest.json";
const DEFAULT_MAX_CONCURRENT = 12;

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });

const preloadWithConcurrency = async (
  urls: string[],
  maxConcurrent: number,
) => {
  if (urls.length === 0) return;

  let currentIndex = 0;
  const workerCount = Math.max(1, Math.min(maxConcurrent, urls.length));

  const workers = Array.from({ length: workerCount }, async () => {
    while (true) {
      const index = currentIndex++;
      if (index >= urls.length) {
        return;
      }

      await preloadImage(urls[index]);
    }
  });

  await Promise.all(workers);
};

export const preloadImageManifest = async ({
  manifestPath = DEFAULT_MANIFEST_PATH,
  maxConcurrent = DEFAULT_MAX_CONCURRENT,
}: PreloadImageManifestOptions = {}) => {
  if (typeof window === "undefined") return;

  try {
    const response = await fetch(manifestPath, { cache: "force-cache" });
    if (!response.ok) {
      console.warn(
        `[ImagePreload] Failed to load manifest (${response.status}): ${manifestPath}`,
      );
      return;
    }

    const manifest = (await response.json()) as ImageManifest;
    const urls = Array.isArray(manifest.images)
      ? manifest.images.filter((url): url is string => typeof url === "string")
      : [];

    if (urls.length === 0) {
      return;
    }

    await preloadWithConcurrency(urls, maxConcurrent);
  } catch (error) {
    console.warn("[ImagePreload] Unexpected error while preloading images.", error);
  }
};

export const startImageManifestPreload = (
  options: PreloadImageManifestOptions = {},
) => {
  if (typeof window === "undefined") return;
  window.setTimeout(() => {
    void preloadImageManifest(options);
  }, 0);
};

