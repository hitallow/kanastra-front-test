import { Boleto } from "@/models/boleto";
import { app } from "../axios";

export class BoletoService {
  public async loadAll(limit?: number, offset?: number): Promise<Boleto[]> {
    try {
      const response = await app.get("/boleto", {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  }

  public async loadById(boletoId: string): Promise<Boleto> {
    try {
      const response = await app.get(`/boleto/${boletoId}`);
      return response.data as Boleto;
    } catch (error) {
      return {
        id: boletoId,
      } as Boleto;
    }
  }
}
