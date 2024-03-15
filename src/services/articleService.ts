import { article } from "./../entity/article";
import { user } from "./../entity/user";
import { AppDataSource } from "../data-source";


export default new (class ArticleServices {

  async create(data: article): Promise<object | string> {
    try {
      const response = await AppDataSource
      .getRepository(article)
      .createQueryBuilder("article")
        .insert()
        .into(article)
        .values(data)
        .execute();
      return {
        message: "success create article",
        data: response,
      };
    } catch (error) {
      console.error("Error in ArticleService.create:", error);
      return "message: something error while create article";
    }
  }

  async update(id: number, data: article): Promise<object | string> {
    try {
        const response = await AppDataSource
        .getRepository(article)
        .createQueryBuilder("article")
        .update(article)
        .set(data)
        .where("id = :id", { id })
        .execute();
      return {
        message: "success update article",
        data: response,
      };
    } catch (error) {
      return "message: something error while update article";
    }
  }

  async delete(id: number): Promise<object | string> {
    try {
        const response = await AppDataSource
        .getRepository(article)
        .createQueryBuilder("article")
        .delete()
        .from(article)
        .where("id = :id", { id })
        .execute();
      return {
        message: "success delete article",
        data: response,
      };
    } catch (error) {
      return "message: something error while delete article";
    }
  }
  async getAll(): Promise<object | string> {
    try {
        const response = await AppDataSource
        .getRepository(article)
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.user", "user")
        .getMany();
      return {
        message: "success get all article",
        data: response,
      };
    } catch (error) {
        console.log(error)
      return "message: something error while get all article";
    }
  }

  async getOne(id: number): Promise<object | string> {
    try {
        const response = await AppDataSource
        .getRepository(article)
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.user", "user")
        .where('article.id = :id', {id})
        .getOne();
      return {
        message: "success getting a Articles",
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Articles";
    }
  }

  async getByUser(id: number): Promise<object | string> {
    try {
        const response = await AppDataSource
        .getRepository(user)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.article", "article")
        .where('user.id = :id', {id})
        .getOne();
      return {
        message: "success getting a Articles",
        data: response,
      };
    } catch (error) {
        console.log(error)

      return "message: something error while getting a Articles";
    }
  }


})();
