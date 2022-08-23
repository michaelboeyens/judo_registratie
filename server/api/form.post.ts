import validator from "validator";
import { defineEventHandler, readBody } from "h3";
import { createTransport, type SentMessageInfo } from "nodemailer";
import type { memberType } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    let {
      family: {
        email,
        email2,
        phone,
        streetName,
        streetNumber,
        postalCode,
        city,
      },
      member: { registrationType, firstName, lastName, birthDate, other },
      additionalInfo: { additionalOptions, socialMediaAgreement },
    }: memberType = await readBody(event);
    const { escape, trim, isEmail } = validator;

    // check and transform user vars
    email = escape(trim(email));
    email2 = escape(trim(email2 ?? ""));
    phone = escape(trim(phone));
    streetName = escape(trim(streetName));
    streetNumber = escape(trim(streetNumber));
    postalCode = escape(trim(postalCode));
    city = escape(trim(city));
    const registration = escape(trim(registrationType));
    firstName = escape(trim(firstName));
    lastName = escape(trim(lastName));
    birthDate = escape(trim(birthDate));
    other = escape(trim(other ?? ""));
    const photoAgreement: number =
      escape(trim(socialMediaAgreement)) === "no" ? 0 : 1;
    const additional: { [key: string]: number } = {
      gJudoka: 0,
      thirdMember: 0,
    };
    if (additionalOptions.length > 0) {
      for (const item of additionalOptions) {
        additional[item] = 1;
      }
    }

    if (!isEmail(email) || !isEmail(email2)) {
      return { sendMail: false };
    } else {
      // create new returnObj with validated values
      const returnObj = {
        email,
        phone,
        streetName,
        streetNumber,
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

      console.log("user input: ", JSON.parse(JSON.stringify(returnObj)));

      // get env vars
      const config = useRuntimeConfig();

      // define connection to mailserver
      const transporter = createTransport({
        host: config.emailHost,
        port: 465,
        secure: true,
        auth: {
          user: config.emailServername,
          pass: config.emailPassword,
        },
      });

      // message to admin
      const mailMessage = {
        from: config.emailSender,
        to: config.emailRecipient,
        subject: `Inschrijving KJC Bazel: ${firstName} ${lastName}`,
        text: JSON.stringify(returnObj),
        html: `<p>${JSON.stringify(returnObj)}</p>`,
      };

      // message to client
      const clientMailMessage = {
        from: config.emailSender,
        to: email,
        subject: `Bevesting inschrijving ${firstName} ${lastName} bij Koninklijke Judoclub Bazel`,
        text: `Bedankt voor uw inschrijving,\n
Wij hebben ze goed ontvangen, en gaan hiermee verder aan de slag.\n
\n
Met vriendelijke groeten,\n
Koninklijke Judoclub Bazel`,
        html: `<p>Beste ${firstName},</p>
      <p>Bedankt voor uw inschrijving,<br />
      Wij hebben ze goed ontvangen, en gaan hiermee verder aan de slag.</p>
      <br />
      <p>Met vriendelijke groeten,<br />
      Koninklijke Judoclub Bazel</p>`,
      };

      const response = await transporter.sendMail(mailMessage);
      let clientResponse: SentMessageInfo | null = null;
      if (response.accepted.length > 0) {
        clientResponse = await transporter.sendMail(clientMailMessage);
      }

      if (email2) {
        clientMailMessage.to = email2;
        clientResponse = await transporter.sendMail(clientMailMessage);
      }

      return {
        sendMail: true,
        emailResponse: response,
        clientEmailResponse: clientResponse,
      };
    }
  } catch (err) {
    console.error(err);
    return { sendMail: false };
  }
});
