import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clients_has_users, clients_has_usersId } from './clients_has_users';
import type { organizations_has_users, organizations_has_usersId } from './organizations_has_users';
import type { tokens, tokensId } from './tokens';
import type { user_roles, user_rolesId } from './user_roles';

export interface usersAttributes {
  id: number;
  external_id: string;
  login: string;
  email: string;
  full_name: string;
  user_role_id_fk?: number;
  password: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "user_role_id_fk";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  external_id!: string;
  login!: string;
  email!: string;
  full_name!: string;
  user_role_id_fk?: number;
  password!: string;

  // users belongsTo user_roles via user_role_id_fk
  user_role_id_fk_user_role!: user_roles;
  getUser_role_id_fk_user_role!: Sequelize.BelongsToGetAssociationMixin<user_roles>;
  setUser_role_id_fk_user_role!: Sequelize.BelongsToSetAssociationMixin<user_roles, user_rolesId>;
  createUser_role_id_fk_user_role!: Sequelize.BelongsToCreateAssociationMixin<user_roles>;
  // users hasMany clients_has_users via user_id_fk
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
  // users hasMany organizations_has_users via user_id_fk
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
  // users hasMany tokens via user_id_fk
  tokens!: tokens[];
  getTokens!: Sequelize.HasManyGetAssociationsMixin<tokens>;
  setTokens!: Sequelize.HasManySetAssociationsMixin<tokens, tokensId>;
  addToken!: Sequelize.HasManyAddAssociationMixin<tokens, tokensId>;
  addTokens!: Sequelize.HasManyAddAssociationsMixin<tokens, tokensId>;
  createToken!: Sequelize.HasManyCreateAssociationMixin<tokens>;
  removeToken!: Sequelize.HasManyRemoveAssociationMixin<tokens, tokensId>;
  removeTokens!: Sequelize.HasManyRemoveAssociationsMixin<tokens, tokensId>;
  hasToken!: Sequelize.HasManyHasAssociationMixin<tokens, tokensId>;
  hasTokens!: Sequelize.HasManyHasAssociationsMixin<tokens, tokensId>;
  countTokens!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    external_id: {
      type: DataTypes.STRING(38),
      allowNull: false,
      unique: "users_external_id_key"
    },
    login: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "users_login_key"
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    user_role_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_roles',
        key: 'id'
      }
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_external_id_key",
        unique: true,
        fields: [
          { name: "external_id" },
        ]
      },
      {
        name: "users_login_key",
        unique: true,
        fields: [
          { name: "login" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
