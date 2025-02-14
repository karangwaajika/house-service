import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";
import { axiosHeader } from "../utils/axiosHeader";

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN,
} from "../utils/token";
import axios from "axios";

export const useProtectPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState({});
  const [userData, setUserData] = useState({});

  // ##################### checking token to return authentication status #############
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
          await refreshToken();
        } else {
          setIsAuthenticated({ status: true });
          getUserInfo();
        }
      } else if (googleAccessToken) {
        const isGoogleTokenValid = await validateGoogleToken(googleAccessToken);
        console.log("google toke is valid", isGoogleTokenValid);
        if (isGoogleTokenValid) {
          setIsAuthenticated({ status: true });
          getUserInfo();
        } else {
          setIsAuthenticated({ status: false });
        }
      } else {
        setIsAuthenticated({ status: false });
      }
    };
    auth().catch(() => setIsAuthenticated({ status: false }));
  }, []);
  // ###################### End token checking ############################

  // ##### refresh token form jwt #######
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated({ status: true });
        getUserInfo()
      } else {
        setIsAuthenticated({ status: false });
      }
    } catch (error) {
      console.error("error refreshing token", error);
      setIsAuthenticated({ status: false });
    }
  };

  // ################ check google token validity
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
  // ########## authenticated user info ######################
  const getUserInfo = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    axios
      .get(axiosHeader.url + "/api/auth/user/")
      .then((res) => {
        console.log("user", res.data);
        console.log(res);
        setUserData(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    setIsAuthenticated({ status: false });
    window.location.reload();
  };
  console.log(isAuthenticated);
  return { isAuthenticated, logout };
};
