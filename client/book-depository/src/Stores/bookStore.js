import { writable } from "svelte/store";

export const baseURL = writable("http://localhost:3000");

export const token = writable();

export const user = writable(localStorage.getItem("user"));

export const cartItems = writable(
	JSON.parse(localStorage.getItem("cartItems")) || []
);
