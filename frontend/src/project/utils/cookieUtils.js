/**
 * Cookie utilities for cross-domain production use.
 * Frontend: Netlify (devcolab.netlify.app)
 * Backend:  Render  (devcolab-backend-nqh9.onrender.com)
 *
 * Cross-domain cookies REQUIRE:  sameSite: "none"  +  secure: true
 */
import Cookies from "js-cookie";

const IS_PROD = import.meta.env.PROD;   // true in production build

const COOKIE_OPTS = IS_PROD
    ? { sameSite: "None", secure: true, expires: 1 }   // 1 day, cross-domain
    : { expires: 1 };                                   // localhost: no special flags needed

/** Read + safely JSON-parse a cookie. Returns null if missing or invalid. */
export const getCookie = (name) => {
    try {
        const val = Cookies.get(name);
        if (!val || val === "undefined") return null;
        return JSON.parse(val);
    } catch {
        return null;
    }
};

/** Write a cookie with the correct cross-domain options. */
export const setCookie = (name, value) => {
    Cookies.set(name, JSON.stringify(value), COOKIE_OPTS);
};

/** Remove a cookie. */
export const removeCookie = (name) => {
    Cookies.remove(name, COOKIE_OPTS);
};
