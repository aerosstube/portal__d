import { RequestWithUser } from "../../../middlewares/auth-middleware";
import { NextFunction, Response } from "express";
import { Transaction } from "sequelize";
import { SequelizeConnect } from "../../../services/databasse-connect";
import { ClientBusinessService } from "../../../services/client-services/client.business.service";

export class ClientController {
  static async getMarkedDeleted(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.json(await ClientBusinessService.getMarkedDeleted());
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
    const transaction: Transaction = await SequelizeConnect.transaction();
    try {
      const {
        query: { ids },
      } = req;

      if (typeof ids === "string") {
        for (const id of ids.split(',')) {
          await ClientBusinessService.delete(parseInt(id), transaction);
        }
      }

      res.status(200).json("Удаление прошло успешно!");
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }
}
