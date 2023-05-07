import { Box } from '@/components/common';
import ToggleModeBtn from '@/components/common/ToggleModeBtn';
import {
  useForm,
  useFieldArray,
  useFormContext,
  useFormState,
  Controller,
  FormProvider,
} from 'react-hook-form';

const TestingPage = function () {
  const userData = { id: 1, name: `견`, profileImg: `` };
  const methods = useForm({ defaultValues: { ...userData } });
  const {
    control,
    register,
    clearErrors,
    formState,
    getFieldState,
    getValues, // 사용시 개발자가 원하는 시점에 특정 값을 뽑아 쓸 때 사용.
    handleSubmit,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch, // 사용 시 form 전체 재 렌더링. 따라서 useWatch 등 사용.
  } = methods;

  return (
    <div>
      <ToggleModeBtn />
      <div>ㅎㅇㅎㅇ</div>
      {/* <Box onClick={addHandler}>추가하기</Box> */}
      <FormProvider {...methods}>
        <div>하이요</div>
      </FormProvider>
    </div>
  );
};

export default TestingPage;
