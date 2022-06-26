import { writable } from "svelte/store";
import "dotenv/config";

export const baseURL = writable("http://localhost:3000" || process.env.BASE_URL);

export const token = writable(false);

export const user = writable(localStorage.getItem("user"));

export const cartItems = writable(
	[]
);

export const emailData = writable();
