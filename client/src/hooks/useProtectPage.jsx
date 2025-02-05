import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN,
} from "../utils/token";
import axios from "axios";

export const useProtectPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState({});

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);
      console.log("Access_token", token);
      console.log("Google_access_token", googleAccessToken);

      if (token) {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
          await REFRESH_TOKEN();
        } else {
          setIsAuthenticated({ status: true });
        }
      } else if (googleAccessToken) {
        const isGoogleTokenValid = await validateGoogleToken(googleAccessToken);
        console.log("google toke is valid", isGoogleTokenValid);
        if (isGoogleTokenValid) {
          setIsAuthenticated({ status: true });
        } else {
          setIsAuthenticated({ status: false });
        }
      } else {
        setIsAuthenticated({ status: false });
      }
    };
    auth().catch(() => setIsAuthenticated({ status: false }));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated({ status: true });
      } else {
        setIsAuthenticated({ status: false });
      }
    } catch (error) {
      console.error("error refreshing token", error);
      setIsAuthenticated({ status: false });
    }
  };

  const validateGoogleToken = async (googleAccessToken) => {
    try {
      const res = await api.post(
        "/api/google/validate_token/",
        {
          access_token: googleAccessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Validated res", res.data);
      return res.data.valid;
    } catch (error) {
      console.error("error validating google", error);
      return false;
    }
  };

  const logout = () => {
    // const google_access = localStorage.getItem(GOOGLE_ACCESS_TOKEN);
    // const jwt_access = localStorage.getItem(ACCESS_TOKEN);
    // const refresh_access = localStorage.getItem(REFRESH_TOKEN);
    // axios.defaults.headers.common["Authorization"] = `Bearer ${
    //   jwt_access ? jwt_access : google_access
    // }`;
    // axios
    //   .post("http://127.0.0.1:8000/api/logout_user/", {
    //     refresh_token: refresh_access,
    //   })
    //   .then((response) => {
    //     console.log("User data", response.data);
    //     localStorage.removeItem(ACCESS_TOKEN);
    //     localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    //     setIsAuthenticated({ status: false });

    //     localStorage.clear();
    //     axios.defaults.headers.common["Authorization"] = null;
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "error verify token",
    //       error.response ? error.response.data : error.message
    //     );
    //     // navigate('/login')
    //   });
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    setIsAuthenticated({ status: false });
    window.location.reload();
  };
  console.log(isAuthenticated);
  return { isAuthenticated, logout };
};
