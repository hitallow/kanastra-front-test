import { FileImport } from "@/models/fileImport";
import { app } from "../axios";

export class FileImportService {
  public static async loadAll(
    limit?: number,
    offset?: number
  ): Promise<{ totalItems: number; fileImports: FileImport[] }> {
    const response = await app.get("/file", {
      params: { limit, offset },
    });
    return response.data;
  }

  public static async import(file: File): Promise<FileImport> {
    const form = new FormData();
    form.append("file", file, file.name);
    const response = await app.post("file/import", form, {
      headers: { "Content-Type": "multipart/form-data;" },
    });

    return response.data as FileImport;
  }
}
