const randomUnicode = () => {
  return Math.floor(Math.random() * (0x9fff - 0x4e00 + 1)) + 0x4e00;
};

interface Query {
  pageSize: number;
  pageNum: number;
  name: string;
  age: number;
  gender: number;
  createTime: number;
}

const generateData = (query: Query) => {
  return Array(query.pageSize)
    .fill(undefined)
    .map(() => {
      return {
        id: window.crypto.randomUUID(),
        name: query.name ?? String.fromCharCode(randomUnicode(), randomUnicode()),
        age: query.age ?? Math.floor(Math.random() * 100),
        gender: query.gender ?? Math.floor(Math.random() * 2),
        createTime: query.createTime ?? Math.floor(Math.random() * new Date().getTime()),
      };
    });
};

export const getDataApi = (params?: any) => {
  console.log(params);
  return {
    code: 200,
    data: {
      list: generateData(params),
      total: 50,
      pageSize: params.pageSize,
    },
  };
};
