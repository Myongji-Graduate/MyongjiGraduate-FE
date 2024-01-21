const addMajorCategory = (categories, degree) => {
	return categories.map((category) => {
		return {
			...category,
			degree,
		};
	});
};

const parseMajorSubject = (result) => {
	const { major, doulbeMajor, subMajor } = result;

	const majorList = [];
	if (doulbeMajor) majorList.push(...addMajorCategory(doulbeMajor.detailCategory, '복수'));
	if (subMajor) majorList.push(...addMajorCategory(subMajor.detailCategory, '복수'));
	majorList.unshift(...addMajorCategory(major.detailCategory, majorList.length === 0 ? undefined : '주'));
	return majorList.map((category) => {
		const { categoryName, totalCredits, takenCredits, completed, degree } = category;
		return {
			degree,
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
	const categoryList = [];

	const majorResult = parseMajorSubject(result);
	const generalElectiveResult = parseGeneralElectiveSubject(result);
	const chapelResult = parseChapelSubject(result.chapelResult);

	categoryList.push(...majorResult);
	categoryList.push(...generalElectiveResult);
	categoryList.push(...chapelResult);
	return {
		basicUserInfo: result.basicInfo,
		categoryList,
	};
};
