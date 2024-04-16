import { FileUploader } from "@/components";
import {
  FileAction,
  FileActionType,
  useFileContext,
} from "@/components/ui/file";
import { FileImportService } from "@/lib/services/file-import-service";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

function ImportFile(): ReactElement {
  const [fileToImport, setFile] = useState<File>();

  const context = useFileContext();

  const sendFile = async () => {
    if (!fileToImport) {
      return;
    }

    context.dispatch({
      type: FileActionType.startUploadFile,
      payload: {},
    } as FileAction);

    try {
      const file = await FileImportService.import(fileToImport);
    } catch (error) {
      console.log("aaaaaaaaaaaaaaaaa");
      alert("Erro ao tentar enviar arquivo");
    } finally {
      console.log("ops");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 mt-3 ">
      <div className="flex w-100 justify-between">
        <h2 className="text-2xl font-semibold leading-tight">
          Importação de arquivos
        </h2>
        <Link to={"/"}>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Voltar a listagem
          </button>
        </Link>
      </div>

      <div className="w-100 flex justify-center">
        <div className="block max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadowdark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-bold text-xl mb-2 text-center">
            Faça o upload do seu arquivo.
          </h2>
          <form
            className="block mt-5 text-base"
            onSubmit={(event) => {
              event.preventDefault();
              sendFile();
            }}
          >
            <FileUploader
              file={fileToImport}
              onChangeFile={(fileEvent) => setFile(fileEvent)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export { ImportFile };
