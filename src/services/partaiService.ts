import { AppDataSource } from "../data-source";
import { partai } from "../entity/partai";

export default new (class PartaiServices {
  async create(data: partai): Promise<object | string> {
    try {
      const response = await AppDataSource.getRepository(partai)
        .createQueryBuilder("partai")
        .insert()
        .into(partai)
        .values(data)
        .execute();

      return {
        message: "success create partai",
        data: response,
      };
    } catch (error) {
      console.error("Error creating partai:", error);
      return "message: something error while create partai";
    }
  }

  async update(id: number, data: partai): Promise<object | string> {
    try {
      const response = await AppDataSource.getRepository(partai)
        .createQueryBuilder("partai")
        .update(partai)
        .set(data)
        .where("id = :id", { id })
        .execute();
      return {
        message: "success update partai",
        data: response,
      };
    } catch (error) {
      console.error("Error updating partai:", error);
      return "message: something error while update partai";
    }
  }

  async delete(id: number): Promise<object | string> {
    try {
      
      const response = await AppDataSource.getRepository(partai)
        .createQueryBuilder("partai")
        .delete()
        .from(partai)
        .where("id = :id", { id })
        .execute();


      return {
        message: "Partai deleted successfully",
        data: response,
      };
    } catch (error) {
      console.error("Error deleting partai:", error);
      return "message: something error while deleting partai";
    }
  }

  async getAll(): Promise<object | string> {
    try {
        const response = await AppDataSource
        .getRepository(partai)
        .createQueryBuilder("partai")
        .getMany();

      console.log(response)

      return {
        message: "success get all partai",
        data: response,
        
      };
    } catch (error) {
        console.log(error)

      return "message: something error while get all partai";

    }
  }

  async getOne(id: number): Promise<object | string> {
    try {
      const response = await AppDataSource.getRepository(partai)
        .createQueryBuilder("partai")
        .leftJoinAndSelect("partai.paslon", "paslon")
        .getOne();

      return {
        message: "success get one partai",
        data: response,
      };
    } catch (error) {
      return "message: something error while get one partai";
    }
  }
})();
