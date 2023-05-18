import { Dispatch, SetStateAction, createContext, useState } from 'react';
import UseTestContainer from './UseTestContainer';

export interface UCContextInterface {
  contextFormName: string | null;
  setContextFormName: Dispatch<SetStateAction<string | null>>;
  contextResName: string | null;
  setContextResName: Dispatch<SetStateAction<string | null>>;
  contextMapped: boolean | null;
  setContextMapped: Dispatch<SetStateAction<boolean>>;
}

export const UCContext = createContext<UCContextInterface>({
  contextFormName: null,
  setContextFormName: () => {},
  contextResName: null,
  setContextResName: () => {},
  contextMapped: false,
  setContextMapped: () => {},
});

const UseCaseTest = function (): JSX.Element {
  const [contextFormName, setContextFormName] = useState<string | null>(null);
  const [contextResName, setContextResName] = useState<string | null>(null);
  const [contextMapped, setContextMapped] = useState<boolean>(false);
  return (
    <UCContext.Provider
      value={{
        contextFormName,
        setContextFormName,
        contextResName,
        setContextResName,
        contextMapped,
        setContextMapped,
      }}
    >
      <UseTestContainer />
    </UCContext.Provider>
  );
};

export default UseCaseTest;
