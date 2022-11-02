
export const parseMandatoryMajorResult = (majorResult) => {
	const mandatoryMajor = majorResult.detailCategory[0].takenMandatoryLectures.reduce(
		(acc, lecture) => {
			acc.totalCredit += lecture.credit;
			acc.takenCredit += lecture.credit;
			acc.detailCategory[0].totalCredits += lecture.credit;
			acc.detailCategory[0].takenCredits += lecture.credit;
			acc.detailCategory[0].takenMandatoryLectures.push(lecture);
			return acc;
		},
		{
			totalCredit: 0,
			takenCredit: 0,
			categoryName: '전공필수',
			detailCategory: [
				{
					categoryName: '전공필수',
					totalCredits: 0,
					takenCredits: 0,
					takenMandatoryLectures: [],
					haveToMandatoryLectures: [],
					takenElectiveLectures: [],
					haveToElectiveLectures: [],
				},
			],
		}
	);

	return majorResult.detailCategory[0].haveToMandatoryLectures.reduce((acc, lecture) => {
		acc.totalCredit += lecture.credit;
		acc.detailCategory[0].totalCredits += lecture.credit;
		acc.detailCategory[0].haveToMandatoryLectures.push(lecture);
		return acc;
	}, mandatoryMajor);
};


export const parseElectiveMajorResult = (majorResult) => {
	const electiveMajor = majorResult.detailCategory[0].takenElectiveLectures.reduce(
		(acc, lecture) => {
			// acc.totalCredit += lecture.credit;
			acc.takenCredit += lecture.credit;
			// acc.detailCategory[0].totalCredits += lecture.credit;
			acc.detailCategory[0].takenCredits += lecture.credit;
			acc.detailCategory[0].takenElectiveLectures.push(lecture);
			return acc;
		},
		{
			// totalCredit: 0,
			takenCredit: 0,
			categoryName: '전공선택',
			detailCategory: [
				{
					categoryName: '전공선택',
					// totalCredits: 0,
					takenCredits: 0,
					takenMandatoryLectures: [],
					haveToMandatoryLectures: [],
					takenElectiveLectures: [],
					haveToElectiveLectures: [],
				},
			],
		}
	);

	return majorResult.detailCategory[0].haveToElectiveLectures.reduce((acc, lecture) => {
		acc.totalCredit += lecture.credit;
		acc.detailCategory[0].totalCredits += lecture.credit;
		acc.detailCategory[0].haveToElectiveLectures.push(lecture);
		return acc;
	}, electiveMajor);
};


export const filterCategoryListCredit = (categoryList) => {
	return categoryList.map((category) => {
		category.takenCredit = Math.min(category.takenCredit, category.totalCredit);
		category.detailCategory = category.detailCategory.map((detail) => {
			detail.takenCredits = Math.min(detail.takenCredits, detail.totalCredits);
			return detail;
		});
		return category;
	});
};


export const parseGraduationResult = (result) => {
	const basicUserInfo = { ...result.basicInfo };
	const categoryList = [];

	const mandatoryMajor = parseMandatoryMajorResult(result.major);
	const electiveyMajor = parseElectiveMajorResult(result.major);

	electiveyMajor.totalCredit = result.major.totalCredit - mandatoryMajor.totalCredit;

	electiveyMajor.detailCategory[0].totalCredits = electiveyMajor.totalCredit;

	electiveyMajor.takenCredit = Math.min(electiveyMajor.takenCredit, electiveyMajor.totalCredit);

	electiveyMajor.detailCategory[0].takenCredit = electiveyMajor.takenCredit;

	categoryList.push(mandatoryMajor);
	categoryList.push(electiveyMajor);
	result.commonCulture.categoryName = '공통교양';
	categoryList.push({ ...result.commonCulture });

	result.coreCulture.categoryName = '핵심교양';
	categoryList.push({ ...result.coreCulture });

	result.basicAcademicalCulture.categoryName = '학문기초교양';
	categoryList.push({ ...result.basicAcademicalCulture });

	result.normalCulture.categoryName = '일반교양';
	categoryList.push({ ...result.normalCulture });

	result.freeElective.categoryName = '자유선택';
	categoryList.push({ ...result.freeElective });

	const filteredCategoryList = filterCategoryListCredit(categoryList);
	return {
		basicUserInfo,
		categoryList: filteredCategoryList,
	};
};