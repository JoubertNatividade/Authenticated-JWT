import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersContoller {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const userAll = await listUsersService.execute()

    return response.json(userAll);
  }

}

export { ListUsersContoller };
