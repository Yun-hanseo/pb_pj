// src/composables/useWishlist.js

import { ref } from "vue";

const STORAGE_KEY = "movie_wishlist";

export function useWishlist() {
    const wishlist = ref(loadWishlist());

    function loadWishlist() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    }

    function saveWishlist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist.value));
    }

    function toggle(movie) {
        const index = wishlist.value.findIndex(m => m.id === movie.id);

        if (index === -1) {
            wishlist.value.push(movie);
        } else {
            wishlist.value.splice(index, 1);
        }

        saveWishlist();
    }

    function isInWishlist(id) {
        return wishlist.value.some(m => m.id === id);
    }

    return { wishlist, toggle, isInWishlist };
}
