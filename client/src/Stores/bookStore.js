import { writable } from "svelte/store";

export const baseURL = writable("http://localhost:3000");

export const token = writable(false);

export const user = writable(localStorage.getItem("user"));

export const cartItems = writable(
	[]
);

export const emailData = writable();
