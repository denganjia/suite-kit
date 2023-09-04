export function getResponsive(props: any, breakpoint: string) {
	let span = props?.span ?? 1;
	if (typeof span === "object") {
		span = span[breakpoint] ?? span;
	}
	let offset = props?.offset ?? 0;
	if (typeof offset === "object") {
		offset = offset[breakpoint] ?? offset;
	}
	return { span, offset };
}
