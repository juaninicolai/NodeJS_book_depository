import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "secret token", (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/login");
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
};

//check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "secret token", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
			} else {
				//console.log(decodedToken);
				//req.decodedToken = decodedToken;
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

export { requireAuth };
