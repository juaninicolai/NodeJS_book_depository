import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
			if (err) {
				console.log(err, decodedToken);
				res.status(401).json({ message: "Unauthorized" });
			} else {
				next();
			}
		});
	} else {
		res.status(401).json({ message: "You must be logged in to do that" });
	};
};

export { requireAuth };
