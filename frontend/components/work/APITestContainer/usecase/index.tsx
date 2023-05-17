import { createContext, useState } from 'react';
import UseTestContainer from './UseTestContainer';

// const UCContext = createContext<>(null);

const UseCaseTest = function (): JSX.Element {
  //   const [first, setfirst] = useState(second);
  //   const [formNameContext, setFormNameContext] = useState<string | null>(null)
  const formNameContext = useState<string | null>(null);
  return (
    // <UCContext.Provider value={formNameContext}>
    <UseTestContainer />
    // </UCContext.Provider>
  );
};

export default UseCaseTest;
