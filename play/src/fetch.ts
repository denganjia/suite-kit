function generatedResponse(data: any) {
	return {
		code: 200,
		data,
		msg: "成功",
	};
}

type Row = {
	name: string;
	age: number;
	date: number;
	gender: number;
	time: number;
};

function generatedData(query: Partial<Row> & { pageSize: number; pageNum: number }): Row[] {
	return Array(query.pageSize ?? 10)
		.fill(undefined)
		.map((_, index) => {
			return {
				name: query.name ?? `张三${index}`,
				age: query.age ?? index + 1,
				date: query.date ?? new Date().getTime(),
				gender: query.gender ?? index % 2 == 0 ? 1 : 0,
				cascader: query.gender ?? index % 2 == 0 ? 0 : 1,
				time: query.time ?? new Date().getTime(),
			};
		});
}

export async function fetchData(query: Partial<Row> & { pageSize: number; pageNum: number }) {
	console.log(query);
	return generatedResponse({
		list: generatedData(query),
		total: 281,
		pageSize: query.pageSize,
		pageNum: query.pageNum,
	});
}
