import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
export const login = async (email, password) => {
  let isAuthorized = false;
  const API_KEY = process.env.API_KEY;
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  if (response.ok) {
    isAuthorized = true;
  }
  return isAuthorized;
};
