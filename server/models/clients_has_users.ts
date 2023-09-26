import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { clients, clientsId } from './clients';
import type { users, usersId } from './users';

export interface clients_has_usersAttributes {
  id: number;
  user_id_fk: number;
  client_id_fk: number;
}

export type clients_has_usersPk = "id";
export type clients_has_usersId = clients_has_users[clients_has_usersPk];
export type clients_has_usersOptionalAttributes = "id";
export type clients_has_usersCreationAttributes = Optional<clients_has_usersAttributes, clients_has_usersOptionalAttributes>;

export class clients_has_users extends Model<clients_has_usersAttributes, clients_has_usersCreationAttributes> implements clients_has_usersAttributes {
  id!: number;
  user_id_fk!: number;
  client_id_fk!: number;

  // clients_has_users belongsTo clients via client_id_fk
  client_id_fk_client!: clients;
  getClient_id_fk_client!: Sequelize.BelongsToGetAssociationMixin<clients>;
  setClient_id_fk_client!: Sequelize.BelongsToSetAssociationMixin<clients, clientsId>;
  createClient_id_fk_client!: Sequelize.BelongsToCreateAssociationMixin<clients>;
  // clients_has_users belongsTo users via user_id_fk
  user_id_fk_user!: users;
  getUser_id_fk_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser_id_fk_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser_id_fk_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof clients_has_users {
    return clients_has_users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    client_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'clients_has_users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clients_has_users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
