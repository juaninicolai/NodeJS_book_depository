import { writable } from "svelte/store";

export const baseURL = writable("https://bookdepository.herokuapp.com");

export const token = writable(false);

export const user = writable(localStorage.getItem("user"));

export const cartItems = writable(
	[]
);

export const emailData = writable();
