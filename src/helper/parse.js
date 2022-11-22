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
	BUSINESS: '경영',
};

export function parseMandatoruMajorDetailCategory(detailCatory, categoryName) {
	const major = detailCatory.takenMandatoryLectures.reduce(
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
			categoryName,
			detailCategory: [
				{
					categoryName,
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

	return detailCatory.haveToMandatoryLectures.reduce((acc, lecture) => {
		acc.totalCredit += lecture.credit;
		acc.detailCategory[0].totalCredits += lecture.credit;
		acc.detailCategory[0].haveToMandatoryLectures.push(lecture);
		return acc;
	}, major);
}

export function parseDetailElectiveMajorResult(detailCatory, categoryName) {
	const major = detailCatory.takenElectiveLectures.reduce(
		(acc, lecture) => {
			acc.totalCredit += lecture.credit;
			acc.takenCredit += lecture.credit;
			acc.detailCategory[0].totalCredits += lecture.credit;
			acc.detailCategory[0].takenCredits += lecture.credit;
			acc.detailCategory[0].takenElectiveLectures.push(lecture);
			return acc;
		},
		{
			totalCredit: 0,
			takenCredit: 0,
			categoryName,
			detailCategory: [
				{
					categoryName,
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

	return detailCatory.haveToElectiveLectures.reduce((acc, lecture) => {
		acc.totalCredit += lecture.credit;
		acc.detailCategory[0].totalCredits += lecture.credit;
		acc.detailCategory[0].haveToElectiveLectures.push(lecture);
		return acc;
	}, major);
}

export const parseMandatoryMajorResult = (majorResult) => {
	let mandatoryMajor;
	if (majorResult.detailCategory.length === 2) {
		if (majorResult.detailCategory[0].detailCategoryName.search(/_A$/) > 0) {
			mandatoryMajor = parseMandatoruMajorDetailCategory(majorResult.detailCategory[1], '전공필수');
			mandatoryMajor.detailCategory[1] = { ...majorResult.detailCategory[0] };
			mandatoryMajor.detailCategory[1].detailCategoryName = '전공선택필수';
			const { totalCredits, takenCredits } = mandatoryMajor.detailCategory[1];
			mandatoryMajor.totalCredit += totalCredits;
			mandatoryMajor.takenCredit += Math.min(totalCredits, takenCredits);
		} else {
			mandatoryMajor = parseMandatoruMajorDetailCategory(majorResult.detailCategory[0], '전공필수');
			mandatoryMajor.detailCategory[1] = { ...majorResult.detailCategory[1] };
			mandatoryMajor.detailCategory[1].detailCategoryName = '전공선택필수';
			const { totalCredits, takenCredits } = mandatoryMajor.detailCategory[1];
			mandatoryMajor.totalCredit += totalCredits;
			mandatoryMajor.takenCredit += Math.min(totalCredits, takenCredits);
		}
	} else {
		mandatoryMajor = parseMandatoruMajorDetailCategory(majorResult.detailCategory[0], '전공필수');
	}

	return mandatoryMajor;
};

export const parseElectiveMajorResult = (majorResult) => {
	let electiveMajor;
	if (majorResult.detailCategory.length === 2) {
		if (majorResult.detailCategory[0].detailCategoryName.search(/_A$/) > 0) {
			electiveMajor = parseDetailElectiveMajorResult(majorResult.detailCategory[1], '전공선택');
			const { totalCredits, takenCredits } = majorResult.detailCategory[0];
			const leftCredits = Math.max(0, takenCredits - totalCredits);
			electiveMajor.takenCredit += leftCredits;
		} else {
			electiveMajor = parseDetailElectiveMajorResult(majorResult.detailCategory[0], '전공선택');
			const { totalCredits, takenCredits } = majorResult.detailCategory[1];
			const leftCredits = Math.max(0, takenCredits - totalCredits);
			electiveMajor.takenCredit += leftCredits;
		}
	} else {
		electiveMajor = parseDetailElectiveMajorResult(majorResult.detailCategory[0], '전공선택');
	}

	return electiveMajor;
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

export function checkCompletedDetailCategory(category) {
	category.detailCategory.map((item) => {
		item.completed = item.takenCredits >= item.totalCredits;
		return item;
	});
}

export const parseGraduationResult = (result) => {
	const basicUserInfo = { ...result.basicInfo };
	const categoryList = [];

	const mandatoryMajor = parseMandatoryMajorResult(result.major);
	const electiveyMajor = parseElectiveMajorResult(result.major);

	electiveyMajor.totalCredit = result.major.totalCredit - mandatoryMajor.totalCredit;

	electiveyMajor.detailCategory[0].totalCredits = electiveyMajor.totalCredit;

	electiveyMajor.takenCredit = Math.min(electiveyMajor.takenCredit, electiveyMajor.totalCredit);

	electiveyMajor.detailCategory[0].takenCredits = electiveyMajor.takenCredit;

	checkCompletedDetailCategory(electiveyMajor);
	checkCompletedDetailCategory(mandatoryMajor);

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
