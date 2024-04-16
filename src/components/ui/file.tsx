import {
  FileAction,
  FileActionType,
  FileContextState,
  FileContextType,
  FileProviderProps,
} from "@/types";
import { createContext, useContext, useReducer } from "react";

export const FileContextInitialValues: Partial<FileContextState> = {
  isLoading: false,
  fileImportList: [],
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction
): FileContextState => {
  switch (action.type) {
    case FileActionType.loading: {
      return {
        ...state,
        isLoading: action.payload?.isLoading || false,
      };
    }

    case FileActionType.appendNewFile: {
      const fileImportList = [...state.fileImportList];

      if (action.payload?.file) {
        fileImportList.push(action.payload?.file);
      }

      return {
        ...state,
        isLoading: false,
        fileImportList,
      };
    }

    case FileActionType.setFiles: {
      return {
        ...state,
        isLoading: false,
        fileImportList: action.payload?.fileImportList || [],
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};
