import { api } from "./api";

export function getPopular(apiKey, page = 1) {
    return api.get("/movie/popular", {
        params: {
            api_key: apiKey,
            page,
        }
    }).then(res => res.data);
}
