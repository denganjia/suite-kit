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
  departId: number;
}

const generateData = (query: Query) => {
  return Array(query.pageSize)
    .fill(undefined)
    .map(() => {
      return {
        id: window.crypto.randomUUID(),
        name:
          query.name ?? String.fromCharCode(randomUnicode(), randomUnicode()),
        age: query.age ?? Math.floor(Math.random() * 100),
        gender: query.gender ?? Math.floor(Math.random() * 2),
        createTime:
          query.createTime ?? Math.floor(Math.random() * new Date().getTime()),
        departId: query.departId ?? Math.floor(Math.random() * 10),
      };
    });
};

export const getDataApi = async (params?: any) => {
  console.log(params);
  return Promise.resolve({
    code: 200,
    data: {
      list: generateData(params),
      total: 50,
      pageSize: params.pageSize,
    },
  });
};

export const departments = [
  {
    label: "技术部",
    value: 0,
    children: [
      { label: "前端", value: 1 },
      { label: "后端", value: 2 },
      { label: "运维", value: 3 },
      { label: "测试", value: 4 },
    ],
  },
  {
    label: "市场部",
    value: 5,
  },
  {
    label: "产品部",
    value: 6,
    children: [{ label: "产品", value: 7 }],
  },
  {
    label: "设计部",
    value: 8,
    children: [{ label: "设计", value: 9 }],
  },
  {
    label: "运营部",
    value: 10,
  },
];
