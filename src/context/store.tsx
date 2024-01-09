"use client";

import { ColorVariant } from "@/lib/types/types";
import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

type ContextProps = {
  colorVariants: ColorVariant[];
  setColorVariants: Dispatch<SetStateAction<ColorVariant[]>>;
};

const GlobalContext = createContext<ContextProps>({
  colorVariants: [],
  setColorVariants: (): ColorVariant[] => [],
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);
  return (
    <GlobalContext.Provider
      value={{
        colorVariants,
        setColorVariants,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
