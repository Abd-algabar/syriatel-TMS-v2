// import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// const AuthContext = createContext(null);
// const STORAGE_KEY = 'syriatel-tms:user';
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// function readStoredUser() {
//   try {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
//   } catch {
//     return null;
//   }
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(readStoredUser);

//   // TODO: استبدل المحاكاة بطلب حقيقي إلى الـ API
//   const login = useCallback(async ({ role,password, email }) => {
//     await sleep(900);
//     const next = { role, email };
//     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
//     setUser(next);
//     return next;
//   }, []);

//   const logout = useCallback(() => {
//     sessionStorage.removeItem(STORAGE_KEY);
//     setUser(null);
//   }, []);

//   const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import api from "../Api/axios";
import { decodeJwt, isTokenExpired } from "../features/auth/auth.utils";

const AuthContext = createContext(null);

const STORAGE_KEY = "syriatel-tms:access-token";

/*
 * قراءة JWT من localStorage عند تشغيل التطبيق
 */
function getStoredToken() {
  const token = localStorage.getItem(STORAGE_KEY);

  if (!token) {
    return null;
  }

  // إذا انتهت صلاحية JWT نحذفه
  if (isTokenExpired(token)) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return token;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken);
  

  /*
   * استخراج بيانات المستخدم من JWT
   */
  const user = useMemo(() => {
    if (!token) {
      return null;
    }

    return decodeJwt(token);
  }, [token]);

  /*
   * تسجيل الدخول
   */
  const login = useCallback(async ({ email, password }) => {
    const response = await api.post("auth/login", {
      email,
      password,
    });
    // console.log(response)
    const accessToken = response.data.data.token;
    console.log("Access token:", accessToken);
    console.log("Decoded user:", decodeJwt(accessToken));
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    /*
     * التأكد أن JWT صالح وغير منتهي
     */
    if (isTokenExpired(accessToken)) {
      throw new Error("Access token is expired");
    }

    /*
     * استخراج بيانات المستخدم
     */
    const decodedUser = decodeJwt(accessToken);

    if (!decodedUser) {
      throw new Error("Invalid access token");
    }

    if (!decodedUser.roles[0]) {
      throw new Error("User role is missing");
    }

    /*
     * تخزين JWT
     */
    localStorage.setItem(STORAGE_KEY, accessToken);

    /*
     * تحديث React state
     */
    setToken(accessToken);

    return decodedUser;
  }, []);

  /*
   * تسجيل الخروج
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [token, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
