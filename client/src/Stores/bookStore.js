import { writable } from "svelte/store";

export const baseURL = writable("http://localhost:3000");

export const token = writable(localStorage.getItem("isLogged"));

export const cartItems = writable(
  JSON.parse(localStorage.getItem("cartItems")) || []
);
