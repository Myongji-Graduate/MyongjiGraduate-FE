const parseMajorSubject = (majorList) => {
	return majorList.map((category) => {
		const { categoryName, totalCredits, takenCredits, completed } = category;
		return {
			categoryName,
			completed,
			totalCredit: totalCredits,
			takenCredit: takenCredits,
			detailCategory: [{ ...category }],
		};
	});
};

const parseGeneralElectiveSubject = (result) => {
	const GeneralElectiveSubject = {
		commonCulture: '공통교양',
		coreCulture: '핵심교양',
		basicAcademicalCulture: '학문기초교양',
		normalCulture: '일반교양',
		freeElective: '자유선택',
	};
	const categories = Object.keys(GeneralElectiveSubject).map((category) => ({
		...result[category],
		categoryName: GeneralElectiveSubject[category],
	}));

	const { takenCount } = result.chapelResult;
	const chapelInfo = { code: 'KMA02101', credit: 0.5, id: 0, name: '채플' };
	categories[0].detailCategory.push({
		categoryName: '채플',
		completed: takenCount === 4,
		takenCredits: takenCount * 0.5,
		totalCredits: 2,
		haveToLectures: takenCount < 4 ? [chapelInfo] : [],
		takenLectures: takenCount > 0 ? [chapelInfo] : [],
	});

	return categories;
};

const parseChapelSubject = (chapel) => {
	return [
		{
			...chapel,
			categoryName: '채플',
			totalCredit: 4,
			takenCredit: chapel.takenCount,
		},
	];
};
export const parseGraduationResult = (result) => {
	const basicUserInfo = { ...result.basicInfo };
	const categoryList = [];
	const majorResult = parseMajorSubject(result.major.detailCategory, categoryList);
	const generalElectiveResult = parseGeneralElectiveSubject(result, categoryList);
	const chapelResult = parseChapelSubject(result.chapelResult, categoryList);
	categoryList.push(...majorResult);
	categoryList.push(...generalElectiveResult);
	categoryList.push(...chapelResult);
	return {
		basicUserInfo,
		categoryList,
	};
};
