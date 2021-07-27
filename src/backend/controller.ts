import fetch from "node-fetch";
import type { Response as FetchResponse } from "node-fetch";
import * as Multer from "multer";
import { BaseController, promisifyMiddleware } from "ts-actionpack";

const MAX_FILE_SIZE = 2000000;
const DEFAULT_MIME_TYPE = "application/octet-stream";

const multer = Multer({ storage: Multer.memoryStorage() });

export class Controller extends BaseController {
  //
  // Actions
  //
  async url() {
    const match = this.req.params[0];
    let url: URL;
    try {
      url = new URL(match);
    } catch (_) {
      return this.error("Invalid url");
    }

    let headRes: FetchResponse;
    try {
      headRes = await fetch(url, { method: "HEAD" });
    } catch (e) {
      return this.error(`Failed to fetch HEAD: ${e.toString()}`);
    }

    const contentLength = parseInt(headRes.headers.get("content-length")!);
    if (contentLength > MAX_FILE_SIZE) {
      return this.error(`Content-length exceeds ${MAX_FILE_SIZE}`);
    }

    let getRes: FetchResponse;
    try {
      getRes = await fetch(url);
    } catch (e) {
      return this.error(`Failed to fetch GET: ${e.toString()}`);
    }
    const mimeType = getRes.headers.get("content-type") ?? DEFAULT_MIME_TYPE;

    const buffer = await getRes.buffer();
    const base64 = buffer.toString("base64");
    const result = `data:${mimeType};base64,${base64}`;
    this.res.send(result);
  }

  async upload() {
    const contentLength = parseInt(this.req.header("content-length")!);
    if (contentLength > MAX_FILE_SIZE) {
      return this.error(`Content-length exceeds ${MAX_FILE_SIZE}`);
    }

    const file = await this.getMultipartSingle("file");
    if (!file) {
      return this.error("File not uploaded");
    }

    const base64 = file.buffer.toString("base64");
    const mimeType = file.mimetype ?? DEFAULT_MIME_TYPE;
    const result = `data:${mimeType};base64,${base64}`;
    this.res.send(result);
  }

  notFound() {
    this.error(`Not found ${this.req.originalUrl}`, 404);
  }

  //
  // Helpers
  //
  protected error(message?: string, status: number = 400) {
    this.res.status(status).json({ status: "error", message });
  }

  protected async getMultipartSingle(
    field: string
  ): Promise<Express.Multer.File | undefined> {
    await promisifyMiddleware(multer.single(field))(this.req, this.res);
    return this.req.file as any;
  }

  // protected fetch(): string {
  // }
}
