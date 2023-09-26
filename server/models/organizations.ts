import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { orders, ordersId } from './orders';
import type { organizations_has_users, organizations_has_usersId } from './organizations_has_users';

export interface organizationsAttributes {
  id: number;
  external_id: string;
  work_name?: string;
  full_name?: string;
  business_address?: string;
  physical_address?: string;
  inn?: string;
  kpp?: string;
  is_deleted: boolean;
}

export type organizationsPk = "id";
export type organizationsId = organizations[organizationsPk];
export type organizationsOptionalAttributes = "id" | "work_name" | "full_name" | "business_address" | "physical_address" | "inn" | "kpp";
export type organizationsCreationAttributes = Optional<organizationsAttributes, organizationsOptionalAttributes>;

export class organizations extends Model<organizationsAttributes, organizationsCreationAttributes> implements organizationsAttributes {
  id!: number;
  external_id!: string;
  work_name?: string;
  full_name?: string;
  business_address?: string;
  physical_address?: string;
  inn?: string;
  kpp?: string;
  is_deleted!: boolean;

  // organizations hasMany orders via organization_id_fk
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
  // organizations hasMany organizations_has_users via organization_id_fk
  organizations_has_users!: organizations_has_users[];
  getOrganizations_has_users!: Sequelize.HasManyGetAssociationsMixin<organizations_has_users>;
  setOrganizations_has_users!: Sequelize.HasManySetAssociationsMixin<organizations_has_users, organizations_has_usersId>;
  addOrganizations_has_user!: Sequelize.HasManyAddAssociationMixin<organizations_has_users, organizations_has_usersId>;
  addOrganizations_has_users!: Sequelize.HasManyAddAssociationsMixin<organizations_has_users, organizations_has_usersId>;
  createOrganizations_has_user!: Sequelize.HasManyCreateAssociationMixin<organizations_has_users>;
  removeOrganizations_has_user!: Sequelize.HasManyRemoveAssociationMixin<organizations_has_users, organizations_has_usersId>;
  removeOrganizations_has_users!: Sequelize.HasManyRemoveAssociationsMixin<organizations_has_users, organizations_has_usersId>;
  hasOrganizations_has_user!: Sequelize.HasManyHasAssociationMixin<organizations_has_users, organizations_has_usersId>;
  hasOrganizations_has_users!: Sequelize.HasManyHasAssociationsMixin<organizations_has_users, organizations_has_usersId>;
  countOrganizations_has_users!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof organizations {
    return organizations.init({
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
    inn: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    kpp: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'organizations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "organizations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
