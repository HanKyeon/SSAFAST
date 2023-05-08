import { useEffect, useState } from 'react';
import { BodyType, DtoType, FieldsType } from './ReqBox';
import ToggleableHeader from './ToggleableHeader';
import ReqItemInner from './ReqItemInner';

export type DtoInfoType = {
  id: string | number;
  workspace_id?: string | number;
  name: string;
  description: string;
  has_parent?: string | number;
  has_child?: string | number;
};

type RefinedDtosType = {
  dtoID: string | number;
  dtoInfo: DtoInfoType;
  dtos: {
    fields: FieldsType[];
    nestedDtos?: RefinedDtosType[];
  };
};

type ReqItemBodyPropsType = {
  name: string;
  item: BodyType;
};

const ReqItemBody = function ({
  name,
  item,
}: ReqItemBodyPropsType): JSX.Element {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const [refinedDtos, setRefinedDtos] = useState<RefinedDtosType[]>();

  const styles = {
    wrapper: `overflow-hidden mt-0 mx-auto text-content`,
  };

  const makeDtosArr = (): void => {
    const arr: RefinedDtosType[] = [];
    for (const eachDtoID in item.dtos) {
      const eachDto: DtoType = item.dtos[eachDtoID] as DtoType;
      //   console.log('eachDto', eachDto); // 객체
      //   console.log('eachDtoID', eachDtoID); // 15
      const innerArr: RefinedDtosType[] = [];
      for (const eachInnerDtoID in eachDto.nestedDtos) {
        const innerDto: DtoType = eachDto.nestedDtos[eachInnerDtoID] as DtoType;
        //   console.log('innerDto', innerDto); // 객체
        //   console.log('eachDtosInnerDto', eachDtosInnerDto); // 15 (: dtoID)

        // eachInnerDtoID로 dtoinfo 알아오는 dispatch()
        const innerDtoInfo: DtoInfoType = {
          id: eachInnerDtoID,
          name: `${eachInnerDtoID}DTO`,
          description: `${eachInnerDtoID}번 DTO입니당`,
        };

        innerArr.push({
          dtoID: eachInnerDtoID,
          dtoInfo: innerDtoInfo,
          dtos: { fields: innerDto.fields },
        });
      }
      // eachDtoID로 dtoinfo 알아오는 dispatch()
      const eachDtoInfo: DtoInfoType = {
        id: eachDtoID,
        name: `${eachDtoID}DTO`,
        description: `${eachDtoID}번 DTO임뮈돵`,
      };
      arr.push({
        dtoID: eachDtoID,
        dtoInfo: eachDtoInfo,
        dtos: { fields: eachDto.fields, nestedDtos: innerArr },
      });
    }
    console.log('arr', arr);
    setRefinedDtos(arr);
  };

  useEffect(() => {
    makeDtosArr();
  }, []);

  return (
    <div className={`w-full`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {isOpen && (
        <div className={`${styles['wrapper']} rounded-[13px] w-[87%]`}>
          {item.fields?.map((item) => (
            <ReqItemInner
              key={item.key}
              item={item}
              depth={0}
              className={`mb-3 rounded-[13px]`}
            />
          ))}
          {refinedDtos?.map((item) => (
            <>
              <ReqItemInner
                key={item.dtoID}
                item={item.dtoInfo}
                depth={0}
                className={`rounded-[13px]`}
              />
              <div
                className={`${styles['wrapper']} rounded-b-[13px] mb-3 w-[95%]`}
              >
                {item.dtos.fields?.map((item) => (
                  <ReqItemInner
                    key={item.key}
                    item={item}
                    depth={1}
                    className={`last:rounded-b-[13px]`}
                  />
                ))}
                {item.dtos.nestedDtos?.map((item) => (
                  <>
                    <ReqItemInner
                      key={item.dtoID}
                      item={item.dtoInfo}
                      depth={1}
                      className={`rounded-[13px]`}
                    />
                    <div className={`${styles['wrapper']} w-[95%]`}>
                      {item.dtos.fields?.map((item) => (
                        <ReqItemInner
                          key={item.key}
                          item={item}
                          depth={2}
                          className={`last:rounded-b-[13px]`}
                        />
                      ))}
                    </div>
                  </>
                ))}
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReqItemBody;
