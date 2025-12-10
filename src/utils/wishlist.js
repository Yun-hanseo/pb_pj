const STORAGE_KEY = "movie_wishlist";

export function getWishlist() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function toggleWishlist(movie) {
    const list = getWishlist();
    const index = list.findIndex((m) => m.id === movie.id);

    if (index === -1) {
        list.push(movie); // 추가
    } else {
        list.splice(index, 1); // 제거
    }

    saveWishlist(list);
    return list;
}

export function isInWishlist(id) {
    const list = getWishlist();
    return list.some((m) => m.id === id);
}
