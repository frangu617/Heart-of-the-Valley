import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const IMAGES_DIR = path.join(ROOT_DIR, "public", "images");
const OUTPUT_FILE = path.join(ROOT_DIR, "public", "image-manifest.json");
const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif", ".gif"]);

const toPosixPath = (inputPath) => inputPath.split(path.sep).join("/");

const collectImagePaths = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const imagePaths = [];

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      const nestedImages = await collectImagePaths(absolutePath);
      imagePaths.push(...nestedImages);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    const relativePathFromPublic = path.relative(
      path.join(ROOT_DIR, "public"),
      absolutePath,
    );
    imagePaths.push(`/${toPosixPath(relativePathFromPublic)}`);
  }

  return imagePaths;
};

const run = async () => {
  const images = await collectImagePaths(IMAGES_DIR);
  images.sort((left, right) => left.localeCompare(right));

  const payload = {
    generatedAt: new Date().toISOString(),
    count: images.length,
    images,
  };

  await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Generated image manifest with ${images.length} images.`);
};

run().catch((error) => {
  console.error("Failed to generate image manifest:", error);
  process.exitCode = 1;
});

