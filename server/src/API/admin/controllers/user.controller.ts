import { RequestWithUser } from "../../../middlewares/auth-middleware";
import { NextFunction, Response } from "express";
import { UserBusinessService } from "../../../services/user-services/user.business.service";
import { Transaction } from "sequelize";
import { SequelizeConnect } from "../../../services/databasse-connect";
import { ClientService } from "../../../services/client-services/client.service";
import { OrganizationService } from "../../../services/organization-services/organization.service";

export class UserController {
  static async create(req: RequestWithUser, res: Response, next: NextFunction) {
    const transaction: Transaction = await SequelizeConnect.transaction();
    try {
      const {
        body: { user },
      } = req;
      await UserBusinessService.create(user, transaction);
      res.status(200).json("Пользователь создан!");
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }

  static async change(req: RequestWithUser, res: Response, next: NextFunction) {
    const transaction: Transaction = await SequelizeConnect.transaction();
    try {
      const {
        body: { user },
      } = req;
      await UserBusinessService.change(user, transaction);
      res.status(200).json("Пользователь изменен!");
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }

  static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await UserBusinessService.getAll());
    } catch (err) {
      next(err);
    }
  }

  static async getAllRoles(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await UserBusinessService.getAllRoles());
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
    const transaction: Transaction = await SequelizeConnect.transaction();
    try {
      const { query: { ids } } = req;
      if (typeof ids === 'string') {
        for (const id of ids.split(',')) {
          await UserBusinessService.delete(parseInt(id), transaction)
        }
        res.json('Все успешно удалено!')
      } else {
        res.status(400).json('Неверный Id!')
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }

  static async addAccess(req: RequestWithUser, res: Response, next: NextFunction) {
    const transaction: Transaction = await SequelizeConnect.transaction()
    try {
      const { body: { userInfo } } = req
      await ClientService.addManagerAccess(userInfo.userId, userInfo.clientIds?.split(','), transaction)
      await OrganizationService.addManagerAccess(userInfo.userId, userInfo.organizationsIds?.split(','), transaction)
      await transaction.commit()
      res.status(200).json("All is good!")
    } catch (err) {
      await transaction.rollback()
      next(err)
    }
  }
}
