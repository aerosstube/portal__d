import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';

export interface vat_ratesAttributes {
  id: number;
  rate?: number;
}

export type vat_ratesPk = "id";
export type vat_ratesId = vat_rates[vat_ratesPk];
export type vat_ratesOptionalAttributes = "id" | "rate";
export type vat_ratesCreationAttributes = Optional<vat_ratesAttributes, vat_ratesOptionalAttributes>;

export class vat_rates extends Model<vat_ratesAttributes, vat_ratesCreationAttributes> implements vat_ratesAttributes {
  id!: number;
  rate?: number;

  // vat_rates hasMany products via vat_rate_id_fk
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

  static initModel(sequelize: Sequelize.Sequelize): typeof vat_rates {
    return vat_rates.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vat_rates',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vat_rates_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
