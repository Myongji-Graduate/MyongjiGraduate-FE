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

	result.major.detailCategory.forEach((category) => {
		categoryList.push({
			categoryName: category.categoryName,
			totalCredit: category.totalCredits,
			takenCredit: category.takenCredits,
			completed: category.completed,
			detailCategory: [{ ...category }],
		});
	});
	const categoryName = ['commonCulture', 'coreCulture', 'basicAcademicalCulture', 'normalCulture', 'freeElective'];
	categoryName.forEach((category) => {
		categoryList.push({
			...result[category],
			categoryName: categoryNameToKorean[category],
		});
	});
	categoryList.push({
		...result.chapelResult,
		categoryName: '채플',
		totalCredit: 4,
		takenCredit: result.chapelResult.takenCount,
	});
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
