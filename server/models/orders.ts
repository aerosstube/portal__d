import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clients, clientsId } from './clients';
import type { counterparties, counterpartiesId } from './counterparties';
import type { order_status, order_statusId } from './order_status';
import type { organizations, organizationsId } from './organizations';
import type { products, productsId } from './products';

export interface ordersAttributes {
  id: number;
  external_id: string;
  phone_number?: string;
  date?: Date;
  organization_id_fk?: number;
  counterparty_id_fk?: number;
  comment?: string;
  order_status_id_fk?: number;
  client_id_fk?: number;
  is_deleted: boolean;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "id" | "phone_number" | "date" | "organization_id_fk" | "counterparty_id_fk" | "comment" | "order_status_id_fk" | "client_id_fk";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: number;
  external_id!: string;
  phone_number?: string;
  date?: Date;
  organization_id_fk?: number;
  counterparty_id_fk?: number;
  comment?: string;
  order_status_id_fk?: number;
  client_id_fk?: number;
  is_deleted!: boolean;

  // orders belongsTo clients via client_id_fk
  client_id_fk_client!: clients;
  getClient_id_fk_client!: Sequelize.BelongsToGetAssociationMixin<clients>;
  setClient_id_fk_client!: Sequelize.BelongsToSetAssociationMixin<clients, clientsId>;
  createClient_id_fk_client!: Sequelize.BelongsToCreateAssociationMixin<clients>;
  // orders belongsTo counterparties via counterparty_id_fk
  counterparty_id_fk_counterparty!: counterparties;
  getCounterparty_id_fk_counterparty!: Sequelize.BelongsToGetAssociationMixin<counterparties>;
  setCounterparty_id_fk_counterparty!: Sequelize.BelongsToSetAssociationMixin<counterparties, counterpartiesId>;
  createCounterparty_id_fk_counterparty!: Sequelize.BelongsToCreateAssociationMixin<counterparties>;
  // orders belongsTo order_status via order_status_id_fk
  order_status_id_fk_order_status!: order_status;
  getOrder_status_id_fk_order_status!: Sequelize.BelongsToGetAssociationMixin<order_status>;
  setOrder_status_id_fk_order_status!: Sequelize.BelongsToSetAssociationMixin<order_status, order_statusId>;
  createOrder_status_id_fk_order_status!: Sequelize.BelongsToCreateAssociationMixin<order_status>;
  // orders hasMany products via order_id_fk
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;
  // orders belongsTo organizations via organization_id_fk
  organization_id_fk_organization!: organizations;
  getOrganization_id_fk_organization!: Sequelize.BelongsToGetAssociationMixin<organizations>;
  setOrganization_id_fk_organization!: Sequelize.BelongsToSetAssociationMixin<organizations, organizationsId>;
  createOrganization_id_fk_organization!: Sequelize.BelongsToCreateAssociationMixin<organizations>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    external_id: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    organization_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
    counterparty_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'counterparties',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING(10240),
      allowNull: true
    },
    order_status_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order_status',
        key: 'id'
      }
    },
    client_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
