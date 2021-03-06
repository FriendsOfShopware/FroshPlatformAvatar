const { Utils } = Shopware;
const { format, string } = Utils;
const md5 = string.md5 || format.md5;

/**
 * Http client for gravatar
 * @class
 */
class FroshPlatformAvatarGravatarService {
    /**
     * @param httpClient {AxiosInstance}
     */
    constructor(httpClient) {
        this._httpClient = httpClient;
    }

    /**
     * @param email {String}
     * @param size {Number} Any sidelength between 1 and 2048
     * @param rating {String} Any of g, pg, r, x
     * @param fallback {String} Any of 404, mp, identicon, monsterid, wavatar, retro, robohash, blank or any URI to graphics
     * @returns {PromiseLike<String> | Promise<String> | String}
     */
    requestAvatarUrl(email, size, rating, fallback) {
        size = size || 80;
        rating = rating || 'g';
        fallback = fallback || '404';
        const url = `https://s.gravatar.com/avatar/${md5(email)}`;
        const params = { size, rating, default: fallback };

        return this._httpClient.get(url, { params }).then(() => url).catch(() => Promise.reject(null));
    }
}

export default FroshPlatformAvatarGravatarService;
