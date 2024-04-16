import { ReactElement } from "react";

export const Welcome = (): ReactElement => {
  return (
    <div className="flex justify-center">
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Olá, bom dia.
        </h1>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Bem vindo ao nosso portal, realize e acompanhe os uploads dos seus
          arquivos.
        </p>
      </div>
    </div>
  );
};
