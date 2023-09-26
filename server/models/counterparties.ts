import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clients, clientsId } from './clients';
import type { counterparty_types, counterparty_typesId } from './counterparty_types';
import type { orders, ordersId } from './orders';

export interface counterpartiesAttributes {
  id: number;
  external_id: string;
  client_id_fk?: number;
  work_name?: string;
  full_name?: string;
  business_address?: string;
  physical_address?: string;
  inn?: string;
  kpp?: string;
  counterparty_type_id_fk: number;
  is_deleted: boolean;
  phone_number?: string;
}

export type counterpartiesPk = "id";
export type counterpartiesId = counterparties[counterpartiesPk];
export type counterpartiesOptionalAttributes = "id" | "client_id_fk" | "work_name" | "full_name" | "business_address" | "physical_address" | "inn" | "kpp" | "phone_number";
export type counterpartiesCreationAttributes = Optional<counterpartiesAttributes, counterpartiesOptionalAttributes>;

export class counterparties extends Model<counterpartiesAttributes, counterpartiesCreationAttributes> implements counterpartiesAttributes {
  id!: number;
  external_id!: string;
  client_id_fk?: number;
  work_name?: string;
  full_name?: string;
  business_address?: string;
  physical_address?: string;
  inn?: string;
  kpp?: string;
  counterparty_type_id_fk!: number;
  is_deleted!: boolean;
  phone_number?: string;

  // counterparties belongsTo clients via client_id_fk
  client_id_fk_client!: clients;
  getClient_id_fk_client!: Sequelize.BelongsToGetAssociationMixin<clients>;
  setClient_id_fk_client!: Sequelize.BelongsToSetAssociationMixin<clients, clientsId>;
  createClient_id_fk_client!: Sequelize.BelongsToCreateAssociationMixin<clients>;
  // counterparties hasMany orders via counterparty_id_fk
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
  // counterparties belongsTo counterparty_types via counterparty_type_id_fk
  counterparty_type_id_fk_counterparty_type!: counterparty_types;
  getCounterparty_type_id_fk_counterparty_type!: Sequelize.BelongsToGetAssociationMixin<counterparty_types>;
  setCounterparty_type_id_fk_counterparty_type!: Sequelize.BelongsToSetAssociationMixin<counterparty_types, counterparty_typesId>;
  createCounterparty_type_id_fk_counterparty_type!: Sequelize.BelongsToCreateAssociationMixin<counterparty_types>;

  static initModel(sequelize: Sequelize.Sequelize): typeof counterparties {
    return counterparties.init({
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
    client_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
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
    inn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    kpp: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    counterparty_type_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'counterparty_types',
        key: 'id'
      }
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    phone_number: {
      type: DataTypes.STRING(12),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'counterparties',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "counterparties_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
