import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { timestempToDate } from "@/helpers/date";
import { BoletoService } from "@/lib/services/boleto-service";
import { Boleto } from "@/models/boleto";
import { ReactElement, useEffect, useState } from "react";

export const ListBoletos = (): ReactElement => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [totalItems, setTotalItems] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BoletoService.loadAll(10, 0);
        setBoletos(data.boletos);
        setTotalItems(data.totalItems);
      } catch (error) {
        alert("erro ao tentar carregar importações");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold leading-tight">Boletos</h2>

      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>ID debito</TableHead>
              <TableHead>ID governamental</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boletos.map((boleto) => (
              <TableRow key={boleto.id}>
                <TableCell>{boleto.id}</TableCell>
                <TableCell>{boleto.name}</TableCell>
                <TableCell>{boleto.email}</TableCell>
                <TableCell>{boleto.debitId}</TableCell>
                <TableCell>{boleto.governmentId}</TableCell>
                <TableCell>{boleto.debitAmount}</TableCell>
                <TableCell>{timestempToDate(boleto.dueDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="text-end">
                Total de items {totalItems}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
