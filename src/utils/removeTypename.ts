// src/utils/removeTypename.ts
export const removeTypename = (object: any): any => {
	if (Array.isArray(object)) {
		return object.map(removeTypename);
	} else if (object !== null && typeof object === "object") {
		const newObj: any = {};
		Object.keys(object).forEach((key) => {
			if (key !== "__typename") {
				newObj[key] = removeTypename(object[key]);
			}
		});
		return newObj;
	}
	return object;
};
