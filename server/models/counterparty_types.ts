import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { counterparties, counterpartiesId } from './counterparties';

export interface counterparty_typesAttributes {
  id: number;
  type: string;
}

export type counterparty_typesPk = "id";
export type counterparty_typesId = counterparty_types[counterparty_typesPk];
export type counterparty_typesOptionalAttributes = "id";
export type counterparty_typesCreationAttributes = Optional<counterparty_typesAttributes, counterparty_typesOptionalAttributes>;

export class counterparty_types extends Model<counterparty_typesAttributes, counterparty_typesCreationAttributes> implements counterparty_typesAttributes {
  id!: number;
  type!: string;

  // counterparty_types hasMany counterparties via counterparty_type_id_fk
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

  static initModel(sequelize: Sequelize.Sequelize): typeof counterparty_types {
    return counterparty_types.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'counterparty_types',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "counterparty_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
