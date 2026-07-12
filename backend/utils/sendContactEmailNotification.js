const nodemailer = require("nodemailer");

async function sendContactEmailNotification({ name, number, email, message }) {
  console.log("📨 Background email function started...");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Optional: verify connection
    transporter.verify((err) => {
      if (err) {
        console.log("❌ SMTP Error:", err);
      } else {
        console.log("✅ SMTP Server ready");
      }
    });

    const mailOptions = {
  from: `"Shriji Photo Studio" <${process.env.SMTP_USER}>`,
  to: process.env.ADMIN_EMAIL,
  subject: `New Inquiry — ${name}`,
  html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#1a1512;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1512;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0d0b08;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0d0b08;padding:32px 40px 24px;border-bottom:1px solid #2c2420;text-align:center;">
              <p style="font-size:11px;color:#B8935A;letter-spacing:0.2em;margin:0 0 6px;font-family:Arial,sans-serif;">SHRIJI PHOTO STUDIO</p>
              <h1 style="font-size:24px;color:#f7f3ee;margin:0;font-weight:400;letter-spacing:0.05em;">New Inquiry Received</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="font-size:11px;color:#B8935A;letter-spacing:0.12em;margin:0 0 20px;font-family:Arial,sans-serif;">CLIENT DETAILS</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36%" style="padding:12px 0;border-bottom:1px solid #2c2420;">
                    <span style="font-size:11px;color:#B8935A;letter-spacing:0.1em;font-family:Arial,sans-serif;">NAME</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #2c2420;">
                    <span style="font-size:15px;color:#f7f3ee;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2c2420;">
                    <span style="font-size:11px;color:#B8935A;letter-spacing:0.1em;font-family:Arial,sans-serif;">PHONE</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #2c2420;">
                    <span style="font-size:15px;color:#f7f3ee;">${number}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2c2420;">
                    <span style="font-size:11px;color:#B8935A;letter-spacing:0.1em;font-family:Arial,sans-serif;">EMAIL</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #2c2420;">
                    <span style="font-size:15px;color:#f7f3ee;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 0;vertical-align:top;">
                    <span style="font-size:11px;color:#B8935A;letter-spacing:0.1em;font-family:Arial,sans-serif;">MESSAGE</span>
                  </td>
                  <td style="padding:16px 0 0;">
                    <p style="font-size:14px;color:#c9c3bb;line-height:1.7;margin:0;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#2c2420;padding:20px 40px;text-align:center;">
              <p style="font-size:11px;color:#B8935A;letter-spacing:0.12em;margin:0;font-family:Arial,sans-serif;">SHRIJI PHOTO STUDIO &nbsp;|&nbsp; Capturing Moments Forever</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `,
};

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent");

  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}

module.exports = sendContactEmailNotification
