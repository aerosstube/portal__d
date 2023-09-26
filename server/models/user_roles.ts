import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface user_rolesAttributes {
  id: number;
  role?: string;
}

export type user_rolesPk = "id";
export type user_rolesId = user_roles[user_rolesPk];
export type user_rolesOptionalAttributes = "id" | "role";
export type user_rolesCreationAttributes = Optional<user_rolesAttributes, user_rolesOptionalAttributes>;

export class user_roles extends Model<user_rolesAttributes, user_rolesCreationAttributes> implements user_rolesAttributes {
  id!: number;
  role?: string;

  // user_roles hasMany users via user_role_id_fk
  users!: users[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<users>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<users, usersId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<users, usersId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<users, usersId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<users>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<users, usersId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<users, usersId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<users, usersId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<users, usersId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_roles {
    return user_roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_roles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
