// src/composables/useTMDB.js
import axios from "axios";

export function useTMDB() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const apiKey = user?.apiKey;

    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: apiKey,
            language: "ko-KR"
        }
    });

    /* ----------------------------------
     * 🔥 Home / Popular API
     * ---------------------------------- */

    async function getPopular(page = 1) {
        const res = await client.get("/movie/popular", { params: { page } });
        return res.data;
    }

    async function getNowPlaying(page = 1) {
        const res = await client.get("/movie/now_playing", { params: { page } });
        return res.data;
    }

    async function getTopRated(page = 1) {
        const res = await client.get("/movie/top_rated", { params: { page } });
        return res.data;
    }

    async function getTrending() {
        const res = await client.get("/trending/movie/week");
        return res.data;
    }


    /* ----------------------------------
     * 🔥 Search API
     * ---------------------------------- */

    async function getGenres() {
        const res = await client.get("/genre/movie/list");
        return res.data.genres;
    }

    async function getDiscoverMovies(page = 1) {
        const res = await client.get("/discover/movie", {
            params: { page }
        });
        return res.data;
    }


    /* ----------------------------------
     * 최종 리턴
     * ---------------------------------- */
    return {
        // Home
        getPopular,
        getNowPlaying,
        getTopRated,
        getTrending,

        // Search
        getGenres,
        getDiscoverMovies,
    };
}

