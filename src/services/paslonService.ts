
import { paslon } from '../entity/paslon';
import { AppDataSource } from '../data-source';

export default new class PaslonServices {
    findById(paslon: any) {
      throw new Error("Method not implemented.");
    }

    async create (data: paslon): Promise<object | string> {
        try {

            const noPaslon = await AppDataSource
            .getRepository(paslon)
            .count();
            if(
                data.no < noPaslon + 1 ||
                data.no > noPaslon + 1
            )
            
            {
                return `message: noPaslon already exist, please input noPaslon ${noPaslon + 1} or more`
            }
            const response = await AppDataSource
            .getRepository(paslon)
            .createQueryBuilder("paslon")
            .insert()
            .into(paslon)
            .values(data)
            .execute();
    
            return {
                message: "success create paslon",
                data: response
            }
        } catch (error) {
            console.error("Error:", error);
            return "message: something error while create paslon"
        }
    }

    async update (id: number, data: paslon): Promise<object | string> {
        try {
            const response = await AppDataSource
        .getRepository(paslon)
        .createQueryBuilder("paslon")
        .update(paslon)
        .set(data)
        .where("id = :id", { id })
        .execute();
            return {
                message: "success update paslon",
                data: paslon
            }
        } catch (error) {
            return "message: something error while update paslon"
        }
    }

    async delete (id: number): Promise<object | string> {
        try {
            
      const response = await AppDataSource.getRepository(paslon)
      .createQueryBuilder("paslon")
      .delete()
      .from(paslon)
      .where("id = :id", { id })
      .execute();
            return {
                message: "success delete paslon",
                data: response
            }
        } catch (error) {
            return "message: something error while delete paslon"
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const response = await AppDataSource
            .getRepository(paslon)
            .createQueryBuilder("paslon")
            .getMany();
    
          console.log(response)
    
            return {
                message: "success get all paslon",
                data: response
            };
        } catch (error) {
            return "message: something error while get all paslon";
        }
    }

    async getOne (id: number): Promise<object | string> {
        try {
            const response = await AppDataSource
            .getRepository(paslon)
            .createQueryBuilder("paslon")
            .leftJoinAndSelect("paslon.partai", "partai")
            .getOne();

            return {
                message: "success get one paslon",
                data: response
            }
        } catch (error) {
            return "message: something error while get one paslon"
        }
    }
}