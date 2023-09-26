import { Transaction } from 'sequelize';
import { order_status } from '../../../models/init-models';
import { Utils } from '../../utils/utils';
import { AuthUser } from '../auth-services/auth.business.service';
import { OrderService } from './order.service';
import { CounterpartyOptions } from '../counterpartie-services/counterparty.business.service';
import { SaveOrganization } from '../organization-services/organization.business.service';
import { ClientOptions } from '../client-services/client.business.service';
import { ProductService } from '../product-services/product.service';
import { OrderDatabaseService } from './order.database.service';


export interface SaveOrder {
    id?: number,
    phoneNumber: string,
    date: Date,
    organization_id_fk: number,
    counterparty_id_fk: number,
    comment: string,
    order_status_id_fk: number,
    client_id_fk: number,
    externalId: string
    isDeleted: boolean;
}

export interface OrderOptions {
    id: number,
    phoneNumber: string,
    date: Date,
    organization: SaveOrganization,
    counterparty: CounterpartyOptions,
    comment: string,
    order_status: order_status,
    client: ClientOptions,
    externalId: string
    isDeleted: boolean;
}

export class OrderBusinessService {
    static async createOrder(user: AuthUser, orderInfo: SaveOrder, transaction: Transaction) {
        Utils.checkRoleAccess(user.role);
        Utils.isDuplicate(await OrderService.isDuplicate(orderInfo));
        return await OrderService.createOrder(orderInfo, transaction);
    }

    static async updateOrder(userRole: string, orderInfo: SaveOrder, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        await OrderService.updateOrder(orderInfo, transaction);
    }

    static async delete(orderId: number, transaction: Transaction) {
        const order = await OrderService.getById(orderId);

        const products = await ProductService.getAllByOrderId(orderId);
        for (let i = 0; i < products.length; i++) {
            await products[i].destroy({ transaction });
        }

        await order.destroy({ transaction });
    }

    static async markDelete(userRole: string, id: number, transaction: Transaction) {
        Utils.checkRoleAccess(userRole);

        await OrderService.markDelete(id, transaction);
    }

    static async getAllOrders(userRole: string): Promise<OrderOptions[]> {
        Utils.checkRoleAccess(userRole);
        return await OrderService.createArrayDto(await OrderService.getAll());
    }

    static async getCurrent(userRole: string, orderId: number): Promise<OrderOptions> {
        Utils.checkRoleAccess(userRole);
        return await OrderService.createDto(await OrderService.getById(orderId));
    }

    static async getAllStatuses(userRole: string): Promise<order_status[]> {
        Utils.checkRoleAccess(userRole);
        return await OrderService.getAllStatuses();
    }

    static async getMarkedDeleted(): Promise<OrderOptions[]> {
        return await OrderService.createArrayDto(await OrderDatabaseService.getOrderBySomeId({
            where: {
                is_deleted: true,
            },
        }));
    }
}
