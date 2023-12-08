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

export const categoryNameToKorean = {
	commonCulture: '공통교양',
	coreCulture: '핵심교양',
	basicAcademicalCulture: '학문기초교양',
	normalCulture: '일반교양',
	major: '전공',
	madantory: '전공필수',
	elective: '전공선택',
	freeElective: '자유선택',
	total: '총 학점',
};

export function parseMandatoruMajorDetailCategory(detailCatory, categoryName) {
	const major = detailCatory.takenLectures.reduce(
		(acc, lecture) => {
			acc.totalCredit += lecture.credit;
			acc.takenCredit += lecture.credit;
			acc.detailCategory[0].totalCredits += lecture.credit;
			acc.detailCategory[0].takenCredits += lecture.credit;
			acc.detailCategory[0].takenLectures.push(lecture);
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
					takenLectures: [],
					haveToLectures: [],
				},
			],
		}
	);

	return detailCatory.haveToLectures.reduce((acc, lecture) => {
		acc.totalCredit += lecture.credit;
		acc.detailCategory[0].totalCredits += lecture.credit;
		acc.detailCategory[0].haveToLectures.push(lecture);
		return acc;
	}, major);
}

export function parseDetailElectiveMajorResult(detailCatory, categoryName) {
	const major = detailCatory.takenLectures.reduce(
		(acc, lecture) => {
			acc.totalCredit += lecture.credit;
			acc.takenCredit += lecture.credit;
			acc.detailCategory[0].totalCredits += lecture.credit;
			acc.detailCategory[0].takenCredits += lecture.credit;
			acc.detailCategory[0].takenLectures.push(lecture);
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
					takenLectures: [],
					haveToLectures: [],
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
		if (majorResult.detailCategory[0].categoryName.search(/_A$/) > 0) {
			mandatoryMajor = parseMandatoruMajorDetailCategory(majorResult.detailCategory[1], '전공필수');
			mandatoryMajor.detailCategory[1] = { ...majorResult.detailCategory[0] };
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
		const { totalCredits, takenCredits } = majorResult.detailCategory[0];
		const leftCredits = Math.max(0, takenCredits - totalCredits);
		electiveMajor = parseDetailElectiveMajorResult(majorResult.detailCategory[0], '전공선택');
	}
	return electiveMajor;
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
	categoryList.push({
		categoryName: result.major.detailCategory[0].categoryName,
		totalCredit: result.major.detailCategory[0].totalCredits,
		takenCredit: result.major.detailCategory[0].takenCredits,
		completed: result.major.detailCategory[0].completed,
		detailCategory: [{ ...result.major.detailCategory[0] }],
	});
	categoryList.push({
		categoryName: result.major.detailCategory[1].categoryName,
		totalCredit: result.major.detailCategory[1].totalCredits,
		takenCredit: result.major.detailCategory[1].takenCredits,
		completed: result.major.detailCategory[1].completed,
		detailCategory: [{ ...result.major.detailCategory[1] }],
	});
	categoryList.push({ ...result.commonCulture, categoryName: categoryNameToKorean.commonCulture });
	categoryList.push({ ...result.coreCulture, categoryName: categoryNameToKorean.coreCulture });
	categoryList.push({ ...result.basicAcademicalCulture, categoryName: categoryNameToKorean.basicAcademicalCulture });
	categoryList.push({ ...result.normalCulture, categoryName: categoryNameToKorean.normalCulture });
	categoryList.push({ ...result.freeElective, categoryName: categoryNameToKorean.freeElective });
	result.chapelResult.takenCredit = result.chapelResult.takenCount;
	result.chapelResult.totalCredit = result.chapelResult.totalCount;
	categoryList.push({ ...result.chapelResult, categoryName: '채플', totalCredit: 4 });
	console.log(categoryList);
	return {
		basicUserInfo,
		categoryList,
	};
};

export const parseLectureResult = (result) => {
	const lectureList = [];
	const unique = [];
	const common = [];

	unique.push({ major: result.major });
	unique.push({ basicAcademicalCulture: result.basicAcademicalCulture });
	common.push({ coreCulture: result.coreCulture });
	common.push({ commonCulture: result.commonCulture });
	lectureList.push(unique);
	lectureList.push(common);
	return lectureList;
};
