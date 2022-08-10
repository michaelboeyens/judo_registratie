import validator from "validator";
import { defineEventHandler, useBody } from "h3";
import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log(body);
  const { escape, trim, isEmail, normalizeEmail } = validator;
  return {
    api: "works",
  };
});
