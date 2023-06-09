import useInput from '@/hooks/useInput';
import { useStoreSelector } from '@/hooks/useStore';
import apiRequest from '@/utils/axios';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Box } from '../common';
import SelectedMember from './SelectedMember';
import SearchedMember from './SearchedMember';
import { useSearchUser, useUserData } from '@/hooks/queries/queries';

interface Props {
  savedImgUrl: string;
  setImgUrl: Dispatch<SetStateAction<string>>;
  savedName: string;
  setName: Dispatch<SetStateAction<string>>;
  savedDes: string;
  setDes: Dispatch<SetStateAction<string>>;
  savedStartDate: any;
  setStartDate: Dispatch<SetStateAction<any>>;
  savedEndDate: any;
  setEndDate: Dispatch<SetStateAction<any>>;
  savedMember: {
    id: number | string;
    name: string;
    profileImg: string;
  }[];
  setSavedMember: Dispatch<
    SetStateAction<{ id: number | string; name: string; profileImg: string }[]>
  >;
  savedBaseUrlList: string;
  setBaseUrlList: Dispatch<SetStateAction<string>>;
}

const GetSpaceData = function ({
  savedImgUrl,
  setImgUrl,
  savedName,
  setName,
  savedDes,
  setDes,
  savedStartDate,
  setStartDate,
  savedEndDate,
  setEndDate,
  savedMember,
  setSavedMember,
  savedBaseUrlList,
  setBaseUrlList,
}: Props) {
  const { dark } = useStoreSelector((state) => state.dark);
  const [
    imgurlRef,
    nameRef,
    desRef,
    startDateRef,
    endDateRef,
    searchRef,
    baseUrlInputRef,
  ] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
  ];
  const {
    inputData: imgUrlInput,
    onChangeHandler: imgUrlChange,
    setFstData: imgUrlSet,
  } = useInput(imgurlRef, 2000);
  const {
    inputData: nameInput,
    onChangeHandler: nameChange,
    setFstData: nameSet,
  } = useInput(nameRef);
  const {
    inputData: desInput,
    onChangeHandler: desChange,
    setFstData: desSet,
  } = useInput(desRef, 500);
  const {
    inputData: startDateInput,
    onChangeHandler: startDateChange,
    setFstData: startDateSet,
  } = useInput(startDateRef);
  const {
    inputData: endDateInput,
    onChangeHandler: endDateChange,
    setFstData: endDateSet,
  } = useInput(endDateRef);
  const {
    debouncedData: searchInput,
    onChangeHandler: searchChange,
    setFstData: searchSet,
  } = useInput(searchRef);
  const {
    inputData: baseUrlInput,
    onChangeHandler: baseUrlInputChange,
    setFstData: baseUrlInputSet,
  } = useInput(baseUrlInputRef, 6000);
  // const [searchList, setSearchList] = useState<
  //   { id: number | string; name: string; profileImg: string }[]
  // >([]);
  const {
    data: searchList,
    isLoading,
    isError,
  } = useSearchUser(searchInput || ``);
  // console.log(searchInput, searchEmailKey);

  // 이전에 저장 된 값 넣기
  useEffect(function () {
    imgUrlSet(savedImgUrl);
    nameSet(savedName);
    desSet(savedDes);
    startDateSet(savedStartDate);
    endDateSet(savedEndDate);
    baseUrlInputSet(savedBaseUrlList);
  }, []);

  // 변할 때 set 해주기
  useEffect(
    function () {
      setImgUrl(() => imgUrlInput);
    },
    [imgUrlInput]
  );
  useEffect(
    function () {
      setName(() => nameInput);
    },
    [nameInput]
  );
  useEffect(
    function () {
      setDes(() => desInput);
    },
    [desInput]
  );
  useEffect(
    function () {
      setStartDate(() => startDateInput);
    },
    [startDateInput]
  );
  useEffect(
    function () {
      setEndDate(() => endDateInput);
    },
    [endDateInput]
  );
  useEffect(
    function () {
      setBaseUrlList(() => baseUrlInput);
    },
    [baseUrlInput]
  );

  // 아래는 직접 검색 날리려 했던 것.
  // useEffect(
  //   function () {
  //     if (searchInput.trim().length === 0) {
  //       return;
  //     }
  //     const cancelToken = axios.CancelToken;
  //     const source = cancelToken.source();
  //     const id = setTimeout(function () {
  //       apiRequest({
  //         method: `get`,
  //         url: `/api/user/list`,
  //         params: {
  //           email: searchInput,
  //         },
  //         cancelToken: source.token,
  //       }).then((res) => {
  //         console.log(res);
  //         setSearchList(() => res.data.users);
  //       });
  //     }, 500);
  //     return function () {
  //       source.cancel();
  //       clearTimeout(id);
  //     };
  //   },
  //   [searchInput]
  // );

  const memberSelectHandler = function (member: {
    id: string | number;
    name: string;
    profileImg: string;
  }) {
    if (!!savedMember.find((sMember) => sMember.id === member.id)) {
      setSavedMember((oldList) =>
        oldList.filter((oldmember) => oldmember.id !== member.id)
      );
    } else {
      setSavedMember((oldList) => [...oldList, member]);
    }
  };
  const { data: userData } = useUserData();

  return (
    <>
      <div className="flex flex-col h-full w-full items-center justify-center gap-5 py-4 text-[24px]">
        <div>팀 정보를 입력해주세요.</div>
        <div className="h-[83%] w-full flex flex-col items-center justify-start overflow-y-scroll gap-3">
          <div className="w-full px-[10%] flex flex-row gap-3">
            <label className="w-[33%]" htmlFor="create-input1">
              프로젝트 이미지
            </label>
            <input
              ref={imgurlRef}
              onChange={imgUrlChange}
              id="create-input1"
              placeholder="이미지 url를 입력해주세요."
              className={`px-[3.3px] py-[3px] w-[67%] bg-opacity-0 border-b-[3px] box-border ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-b-theme-dark-strong'
              }`}
            />
          </div>
          <div className="w-full px-[10%] flex flex-row gap-3">
            <label className="w-[33%]" htmlFor="create-input">
              프로젝트 이름
            </label>
            <input
              ref={nameRef}
              onChange={nameChange}
              id="create-input"
              placeholder="프로젝트 이름을 입력해주세요."
              className={`px-[3.3px] py-[3px] w-[67%] bg-opacity-0 border-b-[3px] box-border ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-b-theme-dark-strong'
              }`}
            />
          </div>
          <div className="w-full px-[10%] flex flex-row gap-3">
            <label className="w-[33%]" htmlFor="create-des">
              프로젝트 설명
            </label>
            <textarea
              ref={desRef}
              onChange={desChange}
              id="create-des"
              maxLength={500}
              placeholder="프로젝트 설명을 입력해주세요."
              className={`px-3 py-2 w-[67%] bg-opacity-0 border-[3px] box-border rounded-[8px] ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-theme-dark-strong'
              }`}
            />
          </div>
          <div className="w-full px-[10%] flex flex-row gap-3">
            <label className="w-[25%]" htmlFor="create-start-date">
              프로젝트 시작
            </label>
            <input
              ref={startDateRef}
              onChange={startDateChange}
              id="create-start-date"
              type="date"
              className={`px-[3.3px] py-[3px] w-[33.5 bg-opacity-20 rounded-[8px] ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal border-b-theme-white-strong'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-b-theme-dark-strong'
              }`}
            />
            <label className="w-[25%]" htmlFor="create-end-date">
              프로젝트 종료
            </label>
            <input
              ref={endDateRef}
              onChange={endDateChange}
              id="create-end-date"
              type="date"
              className={`px-[3.3px] py-[3px] w-[33.5 bg-opacity-20 rounded-[8px] ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal border-b-theme-white-strong'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-b-theme-dark-strong'
              }`}
            />
          </div>
          <div className="w-full px-[10%] flex flex-row gap-3">
            <label className="w-[33%]" htmlFor="create-search">
              프로젝트 멤버 검색
            </label>
            <input
              ref={searchRef}
              onChange={searchChange}
              id="create-search"
              placeholder="이메일로 검색 해주세요."
              className={`px-[3.3px] py-[3px] w-[67%] bg-opacity-0 border-b-[3px] box-border ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-b-theme-dark-strong'
              }`}
            />
          </div>
          <div className="w-full h-[20%] px-[10%] flex flex-row gap-3">
            <div className="w-[33%]">프로젝트 인원</div>
            <div className="w-[67%] h-full flex flex-row gap-[1%]">
              <Box
                variant="three"
                fontType="normal"
                className="w-[49%] text-[24px] px-3 py-2 h-full overflow-y-scroll flex flex-col gap-3"
              >
                {savedMember.length ? (
                  savedMember.map((member) => {
                    return (
                      <SelectedMember
                        member={member}
                        key={`${member.id}-${member.name}-selected`}
                        addHandler={memberSelectHandler}
                      />
                    );
                  })
                ) : (
                  <div>자기 자신은 자동으로 들어갑니다!</div>
                )}
              </Box>
              <Box
                variant="three"
                fontType="normal"
                className="w-[49%] text-[24px] px-3 py-2 h-full overflow-y-scroll flex flex-col gap-3"
              >
                {searchList?.users && searchList.users.length
                  ? searchList.users.map((member) => {
                      return (
                        <SearchedMember
                          member={member}
                          key={`${member.id}-${member.name}-search`}
                          selected={
                            !!savedMember.find(
                              (oldmem) =>
                                oldmem.id === member.id ||
                                oldmem.id === userData?.id
                            )
                          }
                          addHandler={memberSelectHandler}
                        />
                      );
                    })
                  : null}
              </Box>
            </div>
          </div>
          <div className="w-full px-[10%] flex flex-row gap-3">
            <label className="w-[33%]" htmlFor="create-baseUrl">
              프로젝트 사용 url
            </label>
            <textarea
              ref={baseUrlInputRef}
              onChange={baseUrlInputChange}
              id="create-baseUrl"
              placeholder="기본 url를 입력해주세요."
              cols={3}
              maxLength={6000}
              className={`px-3 py-2 w-[67%] bg-opacity-0 border-[3px] box-border rounded-[8px] ${
                dark
                  ? 'bg-theme-white-light border-theme-white-normal'
                  : 'bg-theme-dark-normal text-theme-dark-normal border-theme-dark-strong '
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetSpaceData;
