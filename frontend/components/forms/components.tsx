import React, { AllHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types';
interface formTypes extends AllHTMLAttributes<HTMLFormElement> {
  defaultValues: any;
  children: any;
  onSubmit: any;
  className?: string;
  handleSubmit: any;
  register: any;
}

interface inputTypes extends AllHTMLAttributes<HTMLInputElement> {
  [x: string]: any;
  register?: any;
  name: string;
  className?: string;
}

interface selectTypes extends AllHTMLAttributes<HTMLSelectElement> {
  [x: string]: any;
  register?: any;
  options?: any;
  name: string;
  selectType: number;
}

export function Form({
  defaultValues,
  handleSubmit,
  register,
  children,
  onSubmit,
  className,
}: formTypes) {
  return (
    <form className={`${className}`} onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}

export function Input({ register, name, ...rest }: inputTypes) {
  if (typeof name !== 'string') {
    return null;
  }
  return <input {...register(name)} {...rest} />;
}

// export function Select({ register, options, name, ...rest }: selectTypes) {
//   return (
//     <select {...register(name)} {...rest}>
//       {options.map((value: any) => (
//         <option key={options.index} value={value}>
//           {value}
//         </option>
//       ))}
//     </select>
//   );
// }

export function Select({
  register,
  name,
  children,
  options,
  selectType,
  ...rest
}: selectTypes) {
  const serverData = 'DELETE';
  if (selectType === 1) {
    return (
      <select {...register(name)} {...rest}>
        {options.map((value: any) => (
          <option
            key={options.index}
            value={value}
            selected={value === serverData}
          >
            {value}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <select {...register(name)} {...rest}>
        {children}
      </select>
    );
  }
}
