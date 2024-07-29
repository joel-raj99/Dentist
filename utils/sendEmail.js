"use server";

// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (recipientEmail, doctorId, password, name) => {
  // Configure your email service and credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML content for the email
  const htmlContent = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
              <tbody>
                <tr>
                  <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding-top: 60px; padding-bottom: 20px;" align="center" valign="middle" class="emailLogo">
                    <a href="#" style="text-decoration:none" target="_blank">
                      <img alt="frame" border="0" src="https://your-cdn.com/path-to-image/Frames.png" style="width:80%;height:100px;display:flex" width="150"/>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                    <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi ${name}</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                    <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Your Email Account</h4>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription">
                      <tbody>
                        <tr>
                          <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                            <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Thanks for subscribing to the Vespro newsletter. Please click the confirm button to start receiving our emails.</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton">
                      <tbody>
                        <tr>
                          <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" align="center">
                              <tbody>
                                <tr>
                                  <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton">
                                    <h1 style="color: #333; text-align: center;">Your Doctor Account Information</h1>
                                    <p style="color: #555; font-size:15px;"><strong>Doctor ID:</strong> ${doctorId}</p>
                                    <p style="color: #555;font-size:15px;"><strong>Email:</strong> ${recipientEmail}</p>
                                    <p style="color: #555;font-size:15px;"><strong>Password:</strong> ${password}</p>
                                    <p style="color: #555; text-align: center;">Please keep this information secure.</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Your Doctor Account Information",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
