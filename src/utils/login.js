// TMDB API로 API KEY가 유효한지 검사하는 함수
async function validateApiKey(apiKey) {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

    try {
        const res = await fetch(url);
        return res.ok; // 200이면 true, 401이면 false
    } catch (e) {
        return false;
    }
}

// 회원가입 로직
export async function registerUser(email, apiKey) {
    const apiKeyValid = await validateApiKey(apiKey);

    if (!apiKeyValid) {
        return { success: false, message: "유효하지 않은 TMDB API KEY 입니다." };
    }

    // 유효한 키라면 저장
    const user = {
        email: email,
        apiKey: apiKey,
    };

    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, message: "회원가입 성공! 유효한 API KEY 입니다." };
}

// 로그인 로직
export async function loginUser(email, apiKey) {
    const stored = localStorage.getItem("user");

    if (!stored) {
        return { success: false, message: "등록된 계정이 없습니다." };
    }

    const user = JSON.parse(stored);

    // 이메일 일치 여부
    if (user.email !== email) {
        return { success: false, message: "이메일이 일치하지 않습니다." };
    }

    // API KEY 일치 여부
    if (user.apiKey !== apiKey) {
        return { success: false, message: "API KEY가 일치하지 않습니다." };
    }

    // 실제 TMDB API로 검증
    const isValid = await validateApiKey(apiKey);

    if (!isValid) {
        return { success: false, message: "유효하지 않은 TMDB API KEY 입니다." };
    }

    return { success: true, message: "로그인 성공!" };
}