import { FileUploader } from "@/components";
import { useFileContext } from "@/components/ui/file";
import { FileImportService } from "@/lib/services/file-import-service";
import { FileActionType } from "@/types";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

function ImportFile(): ReactElement {
  const [fileToImport, setFile] = useState<File>();

  const context = useFileContext();

  const navigate = useNavigate();

  const sendFile = async () => {
    if (!fileToImport) {
      return;
    }

    context.dispatch({
      type: FileActionType.loading,
      payload: { isLoading: true },
    });

    try {
      const file = await FileImportService.import(fileToImport);
      context.dispatch({
        type: FileActionType.appendNewFile,
        payload: { file },
      });

      alert("Arquivo enviado com sucesso");
      navigate("/imports");
    } catch (error) {
      alert("Erro ao tentar enviar arquivo");
    } finally {
      context.dispatch({
        type: FileActionType.loading,
        payload: { isLoading: false },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 mt-3 ">
      <h2 className="text-2xl font-semibold leading-tight">
        Importação de arquivos
      </h2>

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
