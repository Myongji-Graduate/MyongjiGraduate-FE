export const detailCategoryToKorean = {
	CAREER: '진로',
	CHRISTIAN: '기독교',
	ENGLISH: '영어',
	EXPRESSION: '사고와 표현',
	HISTORY_AND_PHILOSOPHY: '역사와 철학',
	SOCIETY_AND_COMMUNITY: '사회와 공동체',
	SCIENCE_AND_TECHNOLOGY: '과학과 기술',
	CULTURE_AND_ART: '문화와 예술',
	ICT: 'ICT융합대학',
	RAW: '법과대학',
	MANAGEMENT_INFORMATION: '경영정보',
	INTERNATIONAL_TRADE: '국제통상',
	HUMANITY: '인문대학',
	SOCIAL_SCIENCE: '사회과학대학',
};

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
		if (category.detailCategory) {
			category.detailCategory = category.detailCategory.map((detail) => {
				detail.takenCredits = Math.min(detail.takenCredits, detail.totalCredits);
				return detail;
			});
		}
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

	electiveyMajor.detailCategory[0].completed =
		electiveyMajor.detailCategory[0].takenCredits >= electiveyMajor.detailCategory[0].totalCredits;
	mandatoryMajor.detailCategory[0].completed =
		mandatoryMajor.detailCategory[0].takenCredits >= mandatoryMajor.detailCategory[0].totalCredits;

	console.log(electiveyMajor);
	mandatoryMajor.detailCategory[0].detailCategoryName = '전공필수';
	electiveyMajor.detailCategory[0].detailCategoryName = '전공선택';
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

	result.chapelResult.categoryName = '채플';
	result.chapelResult.takenCredit = result.chapelResult.takenCount;
	result.chapelResult.totalCredit = result.chapelResult.totalCount;

	categoryList.push({ ...result.chapelResult });

	const filteredCategoryList = filterCategoryListCredit(categoryList);
	return {
		basicUserInfo,
		categoryList: filteredCategoryList,
	};
};
