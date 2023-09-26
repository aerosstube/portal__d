import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_devices, user_devicesId } from './user_devices';
import type { users, usersId } from './users';

export interface tokensAttributes {
  id: number;
  refresh_token: string;
  user_device_id_fk: number;
  user_id_fk: number;
  date_expired?: Date;
}

export type tokensPk = "id";
export type tokensId = tokens[tokensPk];
export type tokensOptionalAttributes = "id" | "date_expired";
export type tokensCreationAttributes = Optional<tokensAttributes, tokensOptionalAttributes>;

export class tokens extends Model<tokensAttributes, tokensCreationAttributes> implements tokensAttributes {
  id!: number;
  refresh_token!: string;
  user_device_id_fk!: number;
  user_id_fk!: number;
  date_expired?: Date;

  // tokens belongsTo user_devices via user_device_id_fk
  user_device_id_fk_user_device!: user_devices;
  getUser_device_id_fk_user_device!: Sequelize.BelongsToGetAssociationMixin<user_devices>;
  setUser_device_id_fk_user_device!: Sequelize.BelongsToSetAssociationMixin<user_devices, user_devicesId>;
  createUser_device_id_fk_user_device!: Sequelize.BelongsToCreateAssociationMixin<user_devices>;
  // tokens belongsTo users via user_id_fk
  user_id_fk_user!: users;
  getUser_id_fk_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser_id_fk_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser_id_fk_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tokens {
    return tokens.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    refresh_token: {
      type: DataTypes.STRING(6144),
      allowNull: false
    },
    user_device_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_devices',
        key: 'id'
      }
    },
    user_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    date_expired: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
