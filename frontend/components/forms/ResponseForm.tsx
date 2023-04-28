import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';

interface FormValues {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
  data2: {
    name: string;
    price: number;
    quantity: number;
  };
}
const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: ['cart'],
    control,
  });
};
