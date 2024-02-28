const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class ControllerUser {
  static async getAllUser(req, res) {
    try {
      const allUser = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(allUser);
    } catch (error) {
      console.log(error);
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      await User.create({
        username,
        email,
        password,
      });
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      const response = {
        message: `User with email ${findUser.email} has been created`,
      };
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: {
          email,
        },
      });
     

      if (!findUser) {
        throw { name: "Invalid_email/password" };
      }
      const passwordValidated = comparePassword(password, findUser.password);
     
      if (!passwordValidated) {
        throw { name: "Invalid_email/password" };
      }

      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);
      console.log(access_token);


      res.status(200).json({ access_token, email: findUser.email })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}

module.exports = ControllerUser;
