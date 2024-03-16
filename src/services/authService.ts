import { user } from "../entity/user";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new (class AuthService {
  getOne: any;
  async register(reqBody: any): Promise<object | string> {
    try {
      const checkUsername = await AppDataSource
        .getRepository(user)
        .createQueryBuilder("user")
        .where("user.username = :username", { username: reqBody.username })
        .getCount();

      if (checkUsername > 0) {
        return `message: username ${reqBody.username} already exists`;
      }

      const hashPassword = await bcrypt.hash(reqBody.password, 10);

      const newUser = AppDataSource
      .getRepository(user)
      .create({
        ...reqBody,
        password: hashPassword,
        role: reqBody.role || "user",
      });

      const resRegist = await AppDataSource
      .getRepository(user)
      .save(newUser);

      return {
        message: "register success",
        data: resRegist,
      };
    } catch (error) {
      console.log(error);
      return "message: something error while register";
    }
  }

  async login(reqBody: any): Promise<object | string> {
    try {
      const checkUsername = await AppDataSource
        .getRepository(user)
        .createQueryBuilder("user")
        .where("user.username = :username", { username: reqBody.username })
        .addSelect("user.password")
        .getOne();

      if (!checkUsername) {
        return `message: ${reqBody.username} not found`;
      }

      const comparePassword = await bcrypt.compare(
        reqBody.password,
        checkUsername.password
      );
      if (!comparePassword) {
        return `message: password not match`;
      }

      const obj = {
        id: checkUsername.id,
        username: checkUsername.username,
      };

      const token = jwt.sign(obj, "ARMY", { expiresIn: "24h" });

      return {
        message: "login success",
        data: token,
        user: checkUsername,
      };
    } catch (error) {
      return "message: something error while login";
    }
  }

  async getAll(): Promise<object | string> {
    try {
      const response = await AppDataSource
        .getRepository(user)
        .createQueryBuilder("user")
        .getMany();

      return {
        message: "success get all user",
        data: response,
      };
    } catch (error) {
      return "message: something error while get all user";
    }
  }

//   async getOne(id: number): Promise<object | string> {
//     try {
//       const response = await AppDataSource
//         .getRepository(user)
//         .createQueryBuilder("user")
//         .leftJoinAndSelect("user.user", "user")
//         .where("user.id= :id", { id })
//         .getOne();
//       return {
//         message: "success get one user",
//         data: response,
//       };
//     } catch (error) {
//       return "message: something error while get one user";
//     }
//   }
})();
