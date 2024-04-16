import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { useFileContext } from "@/components/ui/file";
import { timestempToDate } from "@/helpers/date";
import { FileImportService } from "@/lib/services/file-import-service";
import { FileActionType } from "@/types";
import { ReactElement, useEffect, useState } from "react";

function ListFileImports(): ReactElement {
  const [totalItems, setTotalItems] = useState<number>(-1);

  const { state, dispatch } = useFileContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(state.fileImportList)
        if (!state.fileImportList.length) {
          console.log('oi')
          dispatch({
            type: FileActionType.loading,
            payload: {
              isLoading: true,
            },
          });
          const { fileImports, totalItems } = await FileImportService.loadAll();

          dispatch({
            type: FileActionType.setFiles,
            payload: {
              fileImportList: fileImports,
            },
          });
          // setFiles(data.fileImports);
          setTotalItems(totalItems);
        }
      } catch (error) {
        alert("erro ao tentar carregar importações");
      } finally {
        dispatch({
          type: FileActionType.loading,
          payload: {
            isLoading: false,
          },
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold leading-tight">
        Listagem de arquivos
      </h2>

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
            {state.fileImportList.map((file) => (
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
