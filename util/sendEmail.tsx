import { transporter } from "@/emails";
import PlaidVerifyIdentityEmail from "@/react-email-starter/emails/plaid-verify-identity";
import { render } from "@react-email/render";

export const sendEmail = (email: string, validationCode: string) => {
  const emailHtml = render(
    <PlaidVerifyIdentityEmail validationCode={validationCode} />
  );
  const mailOptions = {
    from: "fedirouatbi@gmail.com",
    to: email,
    subject: "Email Validation code ",
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to : " + email);
    }
  });
};
