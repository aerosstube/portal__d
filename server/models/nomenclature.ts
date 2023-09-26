import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';
import type { unit_measures, unit_measuresId } from './unit_measures';

export interface nomenclatureAttributes {
  id: number;
  external_id?: string;
  work_name?: string;
  full_name?: string;
  unit_measure_id_fk?: number;
  is_deleted: boolean;
}

export type nomenclaturePk = "id";
export type nomenclatureId = nomenclature[nomenclaturePk];
export type nomenclatureOptionalAttributes = "id" | "external_id" | "work_name" | "full_name" | "unit_measure_id_fk";
export type nomenclatureCreationAttributes = Optional<nomenclatureAttributes, nomenclatureOptionalAttributes>;

export class nomenclature extends Model<nomenclatureAttributes, nomenclatureCreationAttributes> implements nomenclatureAttributes {
  id!: number;
  external_id?: string;
  work_name?: string;
  full_name?: string;
  unit_measure_id_fk?: number;
  is_deleted!: boolean;

  // nomenclature hasMany products via nomenclature_id_fk
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
  // nomenclature belongsTo unit_measures via unit_measure_id_fk
  unit_measure_id_fk_unit_measure!: unit_measures;
  getUnit_measure_id_fk_unit_measure!: Sequelize.BelongsToGetAssociationMixin<unit_measures>;
  setUnit_measure_id_fk_unit_measure!: Sequelize.BelongsToSetAssociationMixin<unit_measures, unit_measuresId>;
  createUnit_measure_id_fk_unit_measure!: Sequelize.BelongsToCreateAssociationMixin<unit_measures>;

  static initModel(sequelize: Sequelize.Sequelize): typeof nomenclature {
    return nomenclature.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    external_id: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    work_name: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING(10240),
      allowNull: true
    },
    unit_measure_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'unit_measures',
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
    tableName: 'nomenclature',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "nomenclature_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
