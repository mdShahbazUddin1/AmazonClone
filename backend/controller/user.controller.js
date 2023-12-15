const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { userRoute } = require("../routes/users.routes");

// function to send verifiction mail

const sendVerificationMail = async (name, email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gamial",
      auth: {
        user: "jackayron5@gmail.com",
        pass: "unpptovcdhpfkzdv",
      },
    });

    const mailOptions = {
      from: "amazon.com",
      to: email,
      subject: "Email verification",
      text: `Hii ! ${name} Please click the following link to verify your email : http://localhost:8080/verify/${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email Verification failed");
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check is user email exits or not
    const user = await UserModel.findOne({ email });

    if (user) return res.status(403).send({ msg: "Email Already Exists" });

    //hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new UserModel({ name, email, password: hashPassword });

    //Generating verification Token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //saving to database
    await newUser.save();

    // send verification mail to user
    sendVerificationMail(
      newUser.name,
      newUser.email,
      newUser.verificationToken
    );
    res.status(200).send({ msg: "User Register Success" });
  } catch (error) {
    res.status(503).send({ msg: error.message });
  }
};

const verifyEmailToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user)
      return res.status(403).send({ msg: "invalid verification token" });

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).send({ msg: "Email Verification Success" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  register,
  verifyEmailToken,
};
