import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { nomenclature, nomenclatureId } from './nomenclature';
import type { products, productsId } from './products';

export interface unit_measuresAttributes {
  id: number;
  name?: string;
  full_name?: string;
  is_deleted: boolean;
}

export type unit_measuresPk = "id";
export type unit_measuresId = unit_measures[unit_measuresPk];
export type unit_measuresOptionalAttributes = "id" | "name" | "full_name";
export type unit_measuresCreationAttributes = Optional<unit_measuresAttributes, unit_measuresOptionalAttributes>;

export class unit_measures extends Model<unit_measuresAttributes, unit_measuresCreationAttributes> implements unit_measuresAttributes {
  id!: number;
  name?: string;
  full_name?: string;
  is_deleted!: boolean;

  // unit_measures hasMany nomenclature via unit_measure_id_fk
  nomenclatures!: nomenclature[];
  getNomenclatures!: Sequelize.HasManyGetAssociationsMixin<nomenclature>;
  setNomenclatures!: Sequelize.HasManySetAssociationsMixin<nomenclature, nomenclatureId>;
  addNomenclature!: Sequelize.HasManyAddAssociationMixin<nomenclature, nomenclatureId>;
  addNomenclatures!: Sequelize.HasManyAddAssociationsMixin<nomenclature, nomenclatureId>;
  createNomenclature!: Sequelize.HasManyCreateAssociationMixin<nomenclature>;
  removeNomenclature!: Sequelize.HasManyRemoveAssociationMixin<nomenclature, nomenclatureId>;
  removeNomenclatures!: Sequelize.HasManyRemoveAssociationsMixin<nomenclature, nomenclatureId>;
  hasNomenclature!: Sequelize.HasManyHasAssociationMixin<nomenclature, nomenclatureId>;
  hasNomenclatures!: Sequelize.HasManyHasAssociationsMixin<nomenclature, nomenclatureId>;
  countNomenclatures!: Sequelize.HasManyCountAssociationsMixin;
  // unit_measures hasMany products via unit_measure_id_fk
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

  static initModel(sequelize: Sequelize.Sequelize): typeof unit_measures {
    return unit_measures.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'unit_measures',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unit_measures_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
