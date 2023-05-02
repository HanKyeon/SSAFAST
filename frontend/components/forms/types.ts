export interface FormValues {
  response: {
    code: number;
    descriptions: string;
    headers: {
      key: string;
      type: string;
      description: string;
    }[];
    bodys: {
      key: string;
      type: string;
      description: string;
    }[];
  }[];
}
