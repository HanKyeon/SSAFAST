import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { PropsWithChildren, FC } from 'react';
import { useStoreSelector } from '@/hooks/useStore';
import { inputTheme } from '@/utils/styleClasses';
import { Form, Input, Select } from './components';
import { Button } from '../common';

interface formProps {
  category: string;
  ApiName: string;
  ApiDescription: string;
  baeURL: any;
  method: any;
  urn: any;
  headers: any;
  body: any | {};
  path: any | null;
  params: any | null;
}

const RequestForm = function () {
  const { register, handleSubmit } = useForm();
  const { dark } = useStoreSelector((state) => state.dark);

  const onSubmit: SubmitHandler<formProps> = function (data) {
    // updateFuntion(data);
    console.log(data);
  };

  const workingStatus = 1;
  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-3 "
      defaultValues={'s'}
      handleSubmit={handleSubmit}
      register={register}
    >
      <label>
        Category:
        <Select
          selectType={1}
          register={register}
          name="category"
          options={['/', '/user', '/users', '/users/users', '수련', '초현']}
          className={`${
            dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
          } w-48 text-center`}
        ></Select>
      </label>
      {/* working status */}
      <label>
        status:
        <Select
          selectType={2}
          register={register}
          name="status"
          className={`${
            dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
          } w-48 text-center`}
        >
          <option value={workingStatus}>{workingStatus}</option>
          <option value={1}>명세중</option>
          <option value={2}>명세 완료</option>
          <option value={3}>개발중</option>
          <option value={4}>개발완료</option>
        </Select>
      </label>
      {/* API Name */}
      <label>
        Name:
        <Input
          register={register}
          name="name"
          placeholder="API 이름을 입력해 주세요."
          className={`${
            dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
          }`}
        />
      </label>
      {/* API Descriptions */}
      <label>
        Description:
        <Input
          register={register}
          name="description"
          placeholder="API 설명을 입력해 주세요."
          className={`${
            dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
          }`}
        />
      </label>
      {/* BaseUrl */}
      <label>
        BaseUrl :
        <Select
          selectType={1}
          register={register}
          name="baseUrl"
          options={['https://asdasdasdasd.com']}
          className={`${
            dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
          } w-48 text-center`}
        ></Select>
      </label>
      {/* method */}
      <label>
        method :
        <Select
          selectType={1}
          register={register}
          name="method"
          options={['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}
          className={`${
            dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
          } w-48 text-center`}
        >
          <option value="">deafault</option>
        </Select>
      </label>
      {/* method */}
      <label>
        urn:
        <Input />
      </label>

      <Button>저장</Button>
    </Form>
  );
};

export default RequestForm;
