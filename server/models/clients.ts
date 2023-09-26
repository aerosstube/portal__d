import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clients_has_users, clients_has_usersId } from './clients_has_users';
import type { counterparties, counterpartiesId } from './counterparties';
import type { orders, ordersId } from './orders';

export interface clientsAttributes {
  id: number;
  external_id: string;
  work_name?: string;
  full_name?: string;
  business_address?: string;
  physical_address?: string;
  is_deleted: boolean;
}

export type clientsPk = "id";
export type clientsId = clients[clientsPk];
export type clientsOptionalAttributes = "id" | "work_name" | "full_name" | "business_address" | "physical_address";
export type clientsCreationAttributes = Optional<clientsAttributes, clientsOptionalAttributes>;

export class clients extends Model<clientsAttributes, clientsCreationAttributes> implements clientsAttributes {
  id!: number;
  external_id!: string;
  work_name?: string;
  full_name?: string;
  business_address?: string;
  physical_address?: string;
  is_deleted!: boolean;

  // clients hasMany clients_has_users via client_id_fk
  clients_has_users!: clients_has_users[];
  getClients_has_users!: Sequelize.HasManyGetAssociationsMixin<clients_has_users>;
  setClients_has_users!: Sequelize.HasManySetAssociationsMixin<clients_has_users, clients_has_usersId>;
  addClients_has_user!: Sequelize.HasManyAddAssociationMixin<clients_has_users, clients_has_usersId>;
  addClients_has_users!: Sequelize.HasManyAddAssociationsMixin<clients_has_users, clients_has_usersId>;
  createClients_has_user!: Sequelize.HasManyCreateAssociationMixin<clients_has_users>;
  removeClients_has_user!: Sequelize.HasManyRemoveAssociationMixin<clients_has_users, clients_has_usersId>;
  removeClients_has_users!: Sequelize.HasManyRemoveAssociationsMixin<clients_has_users, clients_has_usersId>;
  hasClients_has_user!: Sequelize.HasManyHasAssociationMixin<clients_has_users, clients_has_usersId>;
  hasClients_has_users!: Sequelize.HasManyHasAssociationsMixin<clients_has_users, clients_has_usersId>;
  countClients_has_users!: Sequelize.HasManyCountAssociationsMixin;
  // clients hasMany counterparties via client_id_fk
  counterparties!: counterparties[];
  getCounterparties!: Sequelize.HasManyGetAssociationsMixin<counterparties>;
  setCounterparties!: Sequelize.HasManySetAssociationsMixin<counterparties, counterpartiesId>;
  addCounterparty!: Sequelize.HasManyAddAssociationMixin<counterparties, counterpartiesId>;
  addCounterparties!: Sequelize.HasManyAddAssociationsMixin<counterparties, counterpartiesId>;
  createCounterparty!: Sequelize.HasManyCreateAssociationMixin<counterparties>;
  removeCounterparty!: Sequelize.HasManyRemoveAssociationMixin<counterparties, counterpartiesId>;
  removeCounterparties!: Sequelize.HasManyRemoveAssociationsMixin<counterparties, counterpartiesId>;
  hasCounterparty!: Sequelize.HasManyHasAssociationMixin<counterparties, counterpartiesId>;
  hasCounterparties!: Sequelize.HasManyHasAssociationsMixin<counterparties, counterpartiesId>;
  countCounterparties!: Sequelize.HasManyCountAssociationsMixin;
  // clients hasMany orders via client_id_fk
  orders!: orders[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<orders>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<orders, ordersId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<orders, ordersId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<orders, ordersId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<orders>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<orders, ordersId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<orders, ordersId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<orders, ordersId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<orders, ordersId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof clients {
    return clients.init({
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
    work_name: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING(10240),
      allowNull: true
    },
    business_address: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    physical_address: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'clients',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clients_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
