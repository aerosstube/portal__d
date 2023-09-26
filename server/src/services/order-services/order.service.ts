import { Transaction } from 'sequelize';
import { order_status } from '../../../models/init-models';
import { orders } from '../../../models/orders';
import { ApiError } from '../../errors/api.error';
import { OrderOptions, SaveOrder } from './order.business.service';
import { OrderDatabaseService } from './order.database.service';
import { ClientService } from '../client-services/client.service';
import { CounterpartyService } from '../counterpartie-services/counterparty.service';
import { OrganizationService } from '../organization-services/organization.service';


export class OrderService {
    static async createOrder(orderInfo: SaveOrder, transaction: Transaction) {
        return await OrderDatabaseService.createOrder(orderInfo, transaction);
    }

    static async updateOrder(orderInfo: SaveOrder, transaction: Transaction) {
        const order = await this.getById(orderInfo.id);

        order.order_status_id_fk = orderInfo.order_status_id_fk;
        order.counterparty_id_fk = orderInfo.counterparty_id_fk;
        order.organization_id_fk = orderInfo.organization_id_fk;
        order.date = orderInfo.date;
        order.phone_number = orderInfo.phoneNumber;
        order.client_id_fk = orderInfo.client_id_fk;
        order.comment = orderInfo.comment;
        order.external_id = orderInfo.externalId ? orderInfo.externalId : order.external_id
        await order.save({ transaction });
    }

    static async getAll(): Promise<orders[]> {
        const orders = await OrderDatabaseService.findAll();

        if (orders.length === 0) {
            throw ApiError.BadRequest('Доступных заказов не существует!');
        }

        return orders;
    }

    static async getAllStatuses(): Promise<order_status[]> {
        const statuses = await OrderDatabaseService.findAllStatuses();

        if (statuses.length === 0) {
            throw ApiError.BadRequest('Нет доступных статусов заказа!');
        }

        return statuses;
    }

    static async getById(id: number): Promise<orders> {
        const order = await OrderDatabaseService.findById(id);

        if (!order) {
            throw ApiError.BadRequest('Такого заказа не существует!');
        }

        return order;
    }

    static async isDuplicate(orderInfo: SaveOrder): Promise<boolean> {
        const orders = await OrderDatabaseService.findDuplicate(orderInfo);
        return !!(orders);
    }

    static async createArrayDto(order: orders[]): Promise<OrderOptions[]> {
        const orders = [];
        for (let i = 0; i < order.length; i++) {
            orders.push({
                id: order[i].id,
                client: !order[i].client_id_fk ? null : await ClientService.createDto(await ClientService.getClientByPK(order[i].client_id_fk)),
                comment: order[i].comment,
                counterparty: !order[i].counterparty_id_fk ? null : await CounterpartyService.createDto(await CounterpartyService.getCurrentCounterparty(order[i].counterparty_id_fk)),
                date: order[i].date,
                order_status: await this.getOrderStatusById(order[i].order_status_id_fk),
                organization: !order[i].organization_id_fk ? null : await OrganizationService.createDto(await OrganizationService.getOrganizationByPK(order[i].organization_id_fk)),
                phoneNumber: order[i].phone_number,
                isDeleted: order[i].is_deleted,
            });
        }
        return orders;

    }

    static async createDto(order: orders): Promise<OrderOptions> {
        return {
            id: order.id,
            client: !order.client_id_fk ? null : await ClientService.createDto(await ClientService.getClientByPK(order.client_id_fk)),
            comment: order.comment,
            counterparty: !order.counterparty_id_fk ? null : await CounterpartyService.createDto(await CounterpartyService.getCurrentCounterparty(order.counterparty_id_fk)),
            date: order.date,
            order_status: await this.getOrderStatusById(order.order_status_id_fk),
            organization: !order.organization_id_fk ? null : await OrganizationService.createDto(await OrganizationService.getOrganizationByPK(order.organization_id_fk)),
            phoneNumber: order.phone_number,
            isDeleted: order.is_deleted,
            externalId: order.external_id
        };
    }

    static async markDelete(id: number, transaction: Transaction) {
        const order = await this.getById(id);

        order.is_deleted = !order.is_deleted;

        await order.save({ transaction });
    }

    private static async getOrderStatusById(id: number) {
        const order_status = await OrderDatabaseService.findOrderStatusById(id);
        if (!order_status) {
            throw ApiError.BadRequest('Неверный id заказа!');
        }

        return order_status;
    }

    static async getOrdersBySomeId(option: { where }): Promise<orders[]> {
        return await OrderDatabaseService.getOrderBySomeId(option);
    }


}
