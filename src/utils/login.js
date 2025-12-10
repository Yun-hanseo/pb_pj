// TMDB API로 API KEY가 유효한지 검사하는 함수
async function validateApiKey(apiKey) {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

    try {
        const res = await fetch(url);
        return res.ok;  // 200 → true, 401 → false
    } catch (e) {
        return false;
    }
}

// ⭐ 사용자 정보 저장 방식
// localStorage.userList = [ { email, apiKey } ]
function loadUsers() {
    return JSON.parse(localStorage.getItem("userList") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("userList", JSON.stringify(users));
}

// ⭐ 회원가입
export async function registerUser(email, apiKey) {
    const users = loadUsers();

    // 이미 존재하는 이메일인지 확인
    const exists = users.find(u => u.email === email);
    if (exists) {
        return { success: false, message: "이미 존재하는 이메일입니다." };
    }

    // API KEY 유효성 검사
    const valid = await validateApiKey(apiKey);
    if (!valid) {
        return { success: false, message: "유효하지 않은 TMDB API KEY입니다." };
    }

    // 저장
    users.push({ email, apiKey });
    saveUsers(users);

    return { success: true, message: "회원가입 성공!" };
}

// ⭐ 로그인
export async function loginUser(email, apiKey) {
    const users = loadUsers();

    const user = users.find(u => u.email === email);
    if (!user) {
        return { success: false, message: "등록된 계정이 없습니다." };
    }

    if (user.apiKey !== apiKey) {
        return { success: false, message: "API KEY가 일치하지 않습니다." };
    }

    // API KEY 실제 검증
    const valid = await validateApiKey(apiKey);
    if (!valid) {
        return { success: false, message: "유효하지 않은 TMDB API KEY입니다." };
    }

    // ⭐ keep-login 저장
    localStorage.setItem("currentUser", JSON.stringify(user));

    return { success: true, message: "로그인 성공!" };
}

// ⭐ 자동 로그인 / Keep Login 체크 함수
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

export function logoutUser() {
    localStorage.removeItem("currentUser");
}
