import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const handleErrors = err => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	//incorrect email
	if (err.message === "incorrect email") {
		errors.email = "that email is not registered";
	}

	//incorrect password
	if (err.message === "incorrect password") {
		errors.password = "that password is incorrect";
	}

	//duplicate email
	if (err.code === 11000) {
		errors.email = "That email is already registered";
	}

	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

const maxAge = 86400000;

const signToken = id => {
	return jwt.sign({ id }, process.env.SECRET_TOKEN, {
		expiresIn: maxAge,
	});
};

const sendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		maxAge: maxAge,
		secure: false,
	};
	res.cookie("jwt", token, cookieOptions);
	res.status(statusCode).json({
		user: user._id,
		email: user.email,
		token,
	});
};

export const signup_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.create({ email, password });
		sendToken(user, 201, res);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

export const login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		sendToken(user, 201, res);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

export const logout_get = (req, res) => {
	res.status(200).send();
};

export default User;
