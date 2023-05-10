import { BodyType, DtoType } from '@/components/work/APIDocsContainer/ReqBox';
import {
  DtoInfoType,
  RefinedDtosType,
} from '@/components/work/APIDocsContainer/ReqItemBody';

export const useObjToArr = function (item: BodyType) {
  const arr: RefinedDtosType[] = [];
  for (const eachDtoID in item.nestedDtos) {
    const eachDto: DtoType = item.nestedDtos[eachDtoID] as DtoType;
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
        nestedDtos: { fields: innerDto.fields },
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
      nestedDtos: { fields: eachDto.fields, nestedDtos: innerArr },
    });
  }
  return arr;
};
