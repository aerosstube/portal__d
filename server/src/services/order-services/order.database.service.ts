import { randomInt } from 'crypto';
import { Transaction } from 'sequelize';
import { order_status } from '../../../models/init-models';
import { orders } from '../../../models/orders';
import { SaveOrder } from './order.business.service';


export class OrderDatabaseService {
    static async createOrder(orderInfo: SaveOrder, transaction: Transaction) {
        return await orders.create({
            phone_number: orderInfo.phoneNumber,
            date: orderInfo.date,
            organization_id_fk: orderInfo.organization_id_fk,
            counterparty_id_fk: orderInfo.counterparty_id_fk,
            comment: orderInfo.comment,
            order_status_id_fk: orderInfo.order_status_id_fk,
            client_id_fk: orderInfo.client_id_fk,
            external_id: orderInfo.externalId ? orderInfo.externalId : String(randomInt(1, 100000))
        }, { transaction });
    }


    static async findById(id: number): Promise<orders | null> {
        return await orders.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findDuplicate(orderInfo: SaveOrder): Promise<orders | null> {
        return await orders.findOne({
            where: {
                phone_number: orderInfo.phoneNumber,
                date: orderInfo.date,
                organization_id_fk: orderInfo.organization_id_fk,
                counterparty_id_fk: orderInfo.counterparty_id_fk,
                comment: orderInfo.comment,
                order_status_id_fk: orderInfo.order_status_id_fk,
                client_id_fk: orderInfo.client_id_fk,
            },
        });
    }

    static async findAll(): Promise<orders[]> {
        return await orders.findAll({
            order: [
                ['id', 'ASC'],
            ],
        });
    }

    static async findAllStatuses(): Promise<order_status[]> {
        return await order_status.findAll({
            order: [
                ['status', 'ASC'],
            ],
        });
    }

    static async findOrderStatusById(id: number) {
        return await order_status.findOne({
            where: {
                id: id,
            },
        });
    }

    static async getOrderBySomeId(option: {}) {
        return await orders.findAll(option);
    }
}
