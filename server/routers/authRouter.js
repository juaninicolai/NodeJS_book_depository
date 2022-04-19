import { Router } from "express";
const router = Router();

import { login } from "../auth/authentication.js";

//create login router
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await login(email, password);
  if (response) {
    //req.session.email = email;
    // console.log("log in...", req.sessionID);
    // req.session.save();
    res.send({ authOK: true, email });
  } else {
    res.send({ authOk: false });
  }
});

// router.get("/protected", (req, res) => {
//   console.log(req.sessionID);
//   if (req.session.email) {
//     res.send({ message: "hello" });
//   } else {
//     res.send({ message: "goodbye" });
//   }
// });

export default router;
