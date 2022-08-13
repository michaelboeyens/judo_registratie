import validator from "validator";
import { defineEventHandler, useBody } from "h3";
import { createTransport } from "nodemailer";
import type { memberType } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    let {
      family: { email, phone, streetName, postalCode, city },
      member: { registrationType, firstName, lastName, birthDate, other },
      additionalInfo: { additionalOptions, socialMediaAgreement },
    }: memberType = await useBody(event);
    const { escape, trim, isEmail, normalizeEmail } = validator;

    // check and transform user vars
    email = escape(trim(email));
    phone = escape(trim(phone));
    streetName = escape(trim(streetName));
    postalCode = escape(trim(postalCode));
    city = escape(trim(city));
    const registration = escape(trim(registrationType));
    firstName = escape(trim(firstName));
    lastName = escape(trim(lastName));
    birthDate = escape(trim(birthDate));
    other = escape(trim(other ?? ""));
    let photoAgreement: string | number = escape(trim(socialMediaAgreement));
    if (photoAgreement === "no") {
      photoAgreement = 0;
    } else {
      photoAgreement = 1;
    }
    const additional: { [key: string]: number } = {
      gJudoka: 0,
      thirdMember: 0,
    };
    if (additionalOptions.length > 0) {
      for (const item of additionalOptions) {
        additional[item] = 1;
      }
    }

    if (isEmail(email)) {
      const normalizedMail = normalizeEmail(email);
      if (typeof normalizedMail === "string") {
        email = normalizedMail;
      } else {
        return { sendMail: false };
      }
    } else {
      return { sendMail: false };
    }

    // create new returnObj with validated values
    const returnObj = {
      email,
      phone,
      streetName,
      postalCode,
      city,
      registration,
      firstName,
      lastName,
      birthDate,
      other,
      photoAgreement,
      gJudoka: additional.gJudoka,
      thirdMember: additional.thirdMember,
    };

    const config = useRuntimeConfig();

    const mailMessage = {
      from: config.emailSender,
      to: config.emailRecipient,
      subject: "email test",
      text: JSON.stringify(returnObj),
      html: `<p>${JSON.stringify(returnObj)}</p>`,
    };

    const transporter = createTransport({
      host: config.emailHost,
      port: 465,
      secure: true,
      auth: {
        user: config.emailServername,
        pass: config.emailPassword,
      },
    });

    transporter.sendMail(mailMessage);

    console.log("returnObj: ", returnObj);
    return {
      sendMail: returnObj,
      emailsender: config.emailSender ?? "no env",
    };
  } catch (err) {
    console.error(err);
    return { sendMail: false };
  }
});
