import validator from "validator";
import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const { escape, trim, isEmail, normalizeEmail } = validator;
  return {
    api: "works",
  };
});
