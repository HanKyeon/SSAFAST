import ToggleableHeader from '@/components/work/APIDocsContainer/ToggleableHeader';
import { Box } from '@/components/common';
import { useState } from 'react';
import ReqItem from './ReqItem';
import ReqItemBody from './ReqItemBody';
import { Control, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { ApiTestForm, MockupData2Type } from '.';

interface Props {
  data: MockupData2Type;
  control: Control<ApiTestForm, any>;
}

const ReqBox = function ({ data, control }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const {
    fields: headersFields,
    append: headersAppend,
    remove: headersRemove,
  } = useFieldArray({ control, name: `request.headers` });
  const {
    fields: paramsFields,
    append: paramsAppend,
    remove: paramsRemove,
  } = useFieldArray({ control, name: `request.params` });
  const {
    fields: pathFields,
    append: pathAppend,
    remove: pathRemove,
  } = useFieldArray({ control, name: `request.pathVars` });

  return (
    <Box
      className={`${
        isOpen && 'flex-1'
      } w-full relative min-h-0 overflow-scroll scrollbar-hide duration-[0.33s]`}
    >
      <ToggleableHeader
        title="Request"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      <div
        className={`p-2 pb-4 flex flex-col gap-3 flex-1 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {data.request.headers && (
          <ReqItem
            fields={headersFields}
            formName={`request.headers`}
            name="headers"
            control={control}
            item={data.request.headers}
          />
        )}
        {data.request.body && (
          <ReqItemBody
            formName={`request.body`}
            control={control}
            name="body"
            item={data.request.body}
          />
        )}
        {data.request.pathVars && (
          <ReqItem
            fields={pathFields}
            formName={`request.pathVars`}
            name="Path Variables"
            control={control}
            item={data.request.pathVars}
          />
        )}
        {data.request.params && (
          <ReqItem
            fields={paramsFields}
            formName={`request.params`}
            name="params"
            control={control}
            item={data.request.params}
          />
        )}
      </div>
    </Box>
  );
};

export default ReqBox;
