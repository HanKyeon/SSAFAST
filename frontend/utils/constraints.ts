export const defaultTypes = [
  { id: `String`, name: `String`, desc: `문자열 타입` },
  { id: `int`, name: `Integer`, desc: `정수 타입` },
  { id: `long`, name: `Long`, desc: `큰 수 타입` },
  { id: `float`, name: `Float`, desc: `소수점이 있는 숫자 타입` },
  { id: `double`, name: `Double`, desc: `짱 큰 수 타입` },
  { id: `boolean`, name: `Boolean`, desc: `True/False 타입` },
  { id: `MultipartFile`, name: `MultipartFile`, desc: `파일 타입` },
  { id: `Date`, name: `Date`, desc: `날짜 타입` },
  { id: `LocalDateTime`, name: `LocalDateTime`, desc: `로컬 날짜 타입` },
];

export const valuedConstraints = {
  max: (v: number) => {
    return {
      name: `Max(value=${v})`,
      desc: `최대 ${v}까지 입력 가능합니다.`,
    } as const;
  },
  min: (v: number) => {
    return {
      name: `Min(value=${v})`,
      desc: `최소 ${v}부터 입력 가능합니다.`,
    } as const;
  },
  range: (m: number, M: number) => {
    return {
      name: `Range(min=${m},max=${M})`,
      desc: `${m}~${M}까지의 범위를 허용합니다.`,
    } as const;
  },
  pattern: (regexp: string) => {
    return {
      name: `Pattern(regexp=${regexp})`,
      desc: `정규표현식 ${regexp}를 통과해야 합니다.`,
    } as const;
  },
  length: (m: number, M: number) => {
    return {
      name: `Length(min=${m},max=${M})`,
      desc: `${m}~${M} 길이의 문자열만 허용합니다.`,
    } as const;
  },
};

export const commonConstraints = [
  { name: `NotNull`, desc: `null을 허용하지 않습니다.` },
];
export const stringConstraints = [
  { name: `Email`, desc: `Email 형태만 허용합니다.` },
  { name: `NotBlank`, desc: `"", " " 등을 허용하지 않습니다.` },
  { name: `NotEmpty`, desc: `""을 허용하지 않습니다.` },
  { name: `URL`, desc: `URL 형태만 허용합니다.` },
];
