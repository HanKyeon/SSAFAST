import { Dispatch, SetStateAction, createContext, useState } from 'react';
import UseTestContainer from './UseTestContainer';

export interface UCContextInterface {
  contextFormName: string | null;
  setContextFormName: Dispatch<SetStateAction<string | null>>;
}

export const UCContext = createContext<UCContextInterface>({
  contextFormName: null,
  setContextFormName: () => {},
});

const UseCaseTest = function (): JSX.Element {
  const [contextFormName, setContextFormName] = useState<string | null>(null);
  return (
    <UCContext.Provider value={{ contextFormName, setContextFormName }}>
      <UseTestContainer />
    </UCContext.Provider>
  );
};

export default UseCaseTest;
