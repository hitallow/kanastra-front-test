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
import { FileImportService } from "@/lib/services/file-import-service";
import { FileImport } from "@/models/fileImport";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListFileImports(): ReactElement {
  const [files, setFiles] = useState<FileImport[]>([]);
  const [totalItems, setTotalItems] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FileImportService.loadAll();
        setFiles(data.fileImports);
        setTotalItems(data.totalItems);
      } catch (error) {
        alert("erro ao tentar carregar importações");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex w-100 justify-between">
        <h2 className="text-2xl font-semibold leading-tight">
          Listagem de arquivos
        </h2>
        <Link to={"/import"}>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Importar novo arquivo
          </button>
        </Link>
      </div>

      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Status de importação</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Data de atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.id}</TableCell>
                <TableCell>{file.title}</TableCell>
                <TableCell>{file.status}</TableCell>
                <TableCell>{timestempToDate(file.createdAt)}</TableCell>
                <TableCell>{timestempToDate(file.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-end">
                Total de items {totalItems}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export { ListFileImports };
