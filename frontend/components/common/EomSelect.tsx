import { useState } from 'react';

const methods = ['GET', 'PUT', 'POST', 'DEL', 'PATCH'];

const EomSelect = function (): JSX.Element {
  const [selected, setSelected] = useState<string>('GET');
  //   const;
  return (
    <div className={`relative`}>
      {/* select box */}
      <div>
        <span>{selected}</span>
        <i></i>
      </div>
      {/* option들 뿅 나오는 */}
      {/* <ul className={`absolute`}>
        {methods.map((method, index) => (
          <li key={index} onClick={() => onClickOption(method)}>
            {method}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default EomSelect;
