import { randomUUID } from "node:crypto";
import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { v2 as cloudinary } from "cloudinary";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? "./public/uploads";
const PRIVATE_DIR = process.env.PRIVATE_UPLOAD_DIR ?? "./private";
const MAX_BYTES = (Number(process.env.MAX_UPLOAD_MB ?? "8")) * 1024 * 1024;

const ALLOWED_IMAGE = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
];
const ALLOWED_DOCUMENT = ["application/pdf"];

export type UploadKind = "image" | "document";

export interface SavedFile {
  storageKey: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  publicUrl?: string;
}

export function assertUploadable(file: File, kind: UploadKind): void {
  const allowed = kind === "document" ? ALLOWED_DOCUMENT : ALLOWED_IMAGE;
  if (!allowed.includes(file.type)) {
    throw new Error(
      kind === "document"
        ? "Only PDF files are allowed for this upload."
        : "Only JPEG, PNG, WebP, AVIF, GIF or SVG images are allowed."
    );
  }
  if (file.size > MAX_BYTES) {
    throw new Error(
      `File is too large. Maximum size is ${Math.round(MAX_BYTES / 1024 / 1024)}MB.`
    );
  }
  if (file.size === 0) {
    throw new Error("File is empty.");
  }
}

function safeName(original: string, mimeType: string): string {
  const ext =
    extname(original) ||
    (mimeType === "application/pdf"
      ? ".pdf"
      : mimeType === "image/jpeg"
        ? ".jpg"
        : mimeType === "image/png"
          ? ".png"
          : mimeType === "image/webp"
            ? ".webp"
            : mimeType === "image/avif"
              ? ".avif"
              : mimeType === "image/gif"
                ? ".gif"
                : mimeType === "image/svg+xml"
                  ? ".svg"
                  : ".bin");
  return `${Date.now()}-${randomUUID().slice(0, 8)}${ext.toLowerCase()}`;
}

function uploadImageToCloudinary(
  buffer: Buffer,
  fileName: string
): Promise<{ publicId: string; secureUrl: string }> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "mukti-portfolio",
        public_id: fileName.replace(/\.[^.]+$/, ""),
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("Cloudinary returned no upload result."));
        } else {
          resolve({ publicId: result.public_id, secureUrl: result.secure_url });
        }
      }
    );
    upload.on("error", reject);
    upload.end(buffer);
  });
}

/** Persist public images to Cloudinary when configured; keep private files local. */
export async function saveUpload(
  file: File,
  options: { isPublic: boolean; kind: UploadKind }
): Promise<SavedFile> {
  assertUploadable(file, options.kind);
  const fileName = safeName(file.name, file.type);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (options.isPublic && options.kind === "image" && process.env.CLOUDINARY_URL) {
    const uploaded = await uploadImageToCloudinary(buffer, fileName);
    return {
      storageKey: `cloudinary:${uploaded.publicId}`,
      fileName,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      publicUrl: uploaded.secureUrl,
    };
  }

  const dir = options.isPublic ? UPLOAD_DIR : PRIVATE_DIR;
  await mkdir(dir, { recursive: true });
  const storageKey = join(dir, fileName);
  await writeFile(storageKey, buffer);
  return {
    storageKey,
    fileName,
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
    publicUrl: options.isPublic ? publicUrlFor(fileName) : undefined,
  };
}

/** Public URL path for a publicly stored file. */
export function publicUrlFor(fileName: string): string {
  return `/uploads/${fileName}`;
}

/** Read a file from disk (for protected downloads). */
export async function readUpload(storageKey: string): Promise<Buffer> {
  return readFile(storageKey);
}

/** Delete a file from disk; ignores missing files. */
export async function deleteUpload(storageKey: string): Promise<void> {
  if (storageKey.startsWith("cloudinary:")) {
    const publicId = storageKey.slice("cloudinary:".length);
    if (!publicId) {
      throw new Error("Invalid Cloudinary storage key.");
    }
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Cloudinary asset deletion failed.");
    }
    return;
  }

  try {
    await unlink(storageKey);
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code !== "ENOENT") {
      throw err;
    }
  }
}
