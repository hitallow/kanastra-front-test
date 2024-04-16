import { FileImport } from "@/models/fileImport";
import { ReactNode } from "react";

export enum FileActionType {
  loading,
  endUpload,
  startLoadFiles,
  setFiles,
  appendNewFile,
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  fileImportList: FileImport[];
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState & { file?: FileImport }>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export type {
  FileAction,
  FileContextState,
  FileContextType,
  FileDispatch,
  FileProviderProps
};

