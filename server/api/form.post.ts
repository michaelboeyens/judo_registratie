import validator from "validator";
import { defineEventHandler, readBody } from "h3";
import { createTransport, type SentMessageInfo } from "nodemailer";
import type { memberType } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const { family, member, additionalInfo }: memberType = await readBody(
      event
    );
    const { escape, trim, isEmail } = validator;

    const validateObj = <T>(obj: {
      [P in keyof T]: string;
    }): void => {
      for (const key in obj) {
        obj[key] = escape(trim(obj[key] ?? ""));
      }
    };

    // check and transform user vars
    validateObj(family);
    validateObj(member);

    const photoAgreement: number =
      escape(trim(additionalInfo.socialMediaAgreement)) === "no" ? 0 : 1;
    const additional: { [key: string]: number } = {
      gJudoka: 0,
      thirdMember: 0,
    };
    if (additionalInfo.additionalOptions.length > 0) {
      for (const item of additionalInfo.additionalOptions) {
        additional[item] = 1;
      }
    }

    const emailOptions = {
      allow_utf8_local_part: false,
      domain_specific_validation: true,
    };

    if (
      !isEmail(family.email, emailOptions) ||
      (!isEmail(family.email2, emailOptions) && family.email2.length > 0)
    ) {
      return { sendMail: false };
    } else {
      // create new returnObj with validated values
      const returnObj = {
        email: family.email,
        phone: family.phone,
        streetName: family.streetName,
        streetNumber: family.streetNumber,
        postalCode: family.postalCode,
        city: family.city,
        registration: member.registrationType,
        firstName: member.firstName,
        lastName: member.lastName,
        birthDate: member.birthDate,
        connectionInfo: member.connectionInfo,
        other: member.other,
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

      const adminMessage = JSON.parse(JSON.stringify(returnObj));
      adminMessage["email2"] = family.email2 ?? "";

      // message to admin
      const mailMessage = {
        from: config.emailSender,
        to: config.emailRecipient,
        subject: `Inschrijving KJC Bazel: ${member.firstName} ${member.lastName}`,
        text: JSON.stringify(adminMessage),
        html: `<p>${JSON.stringify(adminMessage)}</p>`,
      };

      // message to client
      const clientMailMessage = {
        from: config.emailSender,
        to: family.email,
        subject: `Bevesting inschrijving ${member.firstName} ${member.lastName} bij Koninklijke Judoclub Bazel`,
        text: `Bedankt voor uw inschrijving,\n
Wij hebben ze goed ontvangen, en gaan hiermee verder aan de slag.\n
\n
Met vriendelijke groeten,\n
Koninklijke Judoclub Bazel`,
        html: `<p>Beste ${member.firstName},</p>
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
        console.log(`${family.email}`, clientResponse);
      }

      if (family.email2) {
        clientMailMessage.to = family.email2;
        clientResponse = await transporter.sendMail(clientMailMessage);
        console.log(`${family.email2}`, clientResponse);
      }

      return {
        sendMail: true,
      };
    }
  } catch (err) {
    console.error(err);
    return { sendMail: false };
  }
});
