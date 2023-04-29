import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        type: "login",
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
    });

    console.log("email sent successfully");

    res.status(200).json({
        success: true,
        message: "Password reset link send successfully"
      });

  } catch (error) {
    next(error);
  }
};
