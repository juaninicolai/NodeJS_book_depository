import { Router } from "express";
const router = Router();

import { sendMail } from "../mail/nodemailer.js";

router.post("/", async (req, res) => {
  let email = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;
  let response = await sendMail(email, subject, message);
  res.send(response);
});

export default router;
