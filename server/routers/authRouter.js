import { Router } from "express";
const router = Router();

import { login } from "../auth/authentication.js";

//create login router
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await login(email, password);
  if (response) {
    res.send({ authOK: true, email });
  } else {
    res.send({ authOk: false });
  }
});

export default router;
