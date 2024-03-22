import { vote } from "../entity/vote";
import { AppDataSource } from "../data-source";

export default new (class VoteService {
  async create(data: any): Promise<object | string> {
    try {
      const checkVoter = await AppDataSource
        .getRepository(vote)
        .createQueryBuilder("vote")
        .leftJoin("vote.user", "user")
        .where("user.id = :userId", { userId: data.user })
        .getOne();

      if (checkVoter) {
        console.log("bisaaa" ,checkVoter)
        return "message: voter already voted";
      }

      const response = await AppDataSource
      .getRepository(vote)
      .createQueryBuilder("vote")
      .insert()
      .into(vote)
      .values(data)
      .execute();
      
      return {
        message: "success create vote",
        data: response,
      };
    } catch (error) {
      console.log("error"+error)

      return "message: something error while create vote";
    }
  }

  async getAll(): Promise<object | string> {
    try {
        const response = await AppDataSource.getRepository(vote)
        .createQueryBuilder("vote")
        .leftJoinAndSelect("vote.user", "user")
        .leftJoinAndSelect("vote.paslon", "paslon")
        .select([])
        .getMany();

      const countVoters = await AppDataSource.getRepository(vote)
        .createQueryBuilder("vote")
        .getCount();
      return {
        message: "success get all vote",
        countVoters: countVoters,
        data: response,
      };
    } catch (error) {
      return "message: something error while get all vote";
    }
  }

  async getOne(id: number): Promise<object | string> {
    try {
      const response = await AppDataSource.getRepository(vote)
        .createQueryBuilder("vote")
        .leftJoinAndSelect("vote.user", "user")
        .leftJoinAndSelect("vote.paslon", "paslon")
        .select([])
        .getOne();

      const countVoters = await AppDataSource.getRepository(vote)
        .createQueryBuilder("vote")
        .getCount();
      return {
        message: "success get all vote",
        countVoters: countVoters,
        data: response,
      };
    } catch (error) {
      return "message: something error while getting a Vote";
    }
  }
})();
