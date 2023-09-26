import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { organizations, organizationsId } from './organizations';
import type { users, usersId } from './users';

export interface organizations_has_usersAttributes {
  id: number;
  user_id_fk: number;
  organization_id_fk: number;
}

export type organizations_has_usersPk = "id";
export type organizations_has_usersId = organizations_has_users[organizations_has_usersPk];
export type organizations_has_usersOptionalAttributes = "id";
export type organizations_has_usersCreationAttributes = Optional<organizations_has_usersAttributes, organizations_has_usersOptionalAttributes>;

export class organizations_has_users extends Model<organizations_has_usersAttributes, organizations_has_usersCreationAttributes> implements organizations_has_usersAttributes {
  id!: number;
  user_id_fk!: number;
  organization_id_fk!: number;

  // organizations_has_users belongsTo organizations via organization_id_fk
  organization_id_fk_organization!: organizations;
  getOrganization_id_fk_organization!: Sequelize.BelongsToGetAssociationMixin<organizations>;
  setOrganization_id_fk_organization!: Sequelize.BelongsToSetAssociationMixin<organizations, organizationsId>;
  createOrganization_id_fk_organization!: Sequelize.BelongsToCreateAssociationMixin<organizations>;
  // organizations_has_users belongsTo users via user_id_fk
  user_id_fk_user!: users;
  getUser_id_fk_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser_id_fk_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser_id_fk_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof organizations_has_users {
    return organizations_has_users.init({
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
    organization_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'organizations_has_users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "organizations_has_users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
