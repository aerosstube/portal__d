import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { nomenclature, nomenclatureId } from './nomenclature';
import type { orders, ordersId } from './orders';
import type { unit_measures, unit_measuresId } from './unit_measures';
import type { vat_rates, vat_ratesId } from './vat_rates';

export interface productsAttributes {
  id: number;
  nomenclature_id_fk?: number;
  unit_measure_id_fk?: number;
  amount?: number;
  cost?: number;
  total?: number;
  sale?: number;
  vat_rate_id_fk?: number;
  vat_total?: number;
  total_sum?: number;
  order_id_fk?: number;
  is_deleted: boolean;
}

export type productsPk = "id";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "id" | "nomenclature_id_fk" | "unit_measure_id_fk" | "amount" | "cost" | "total" | "sale" | "vat_rate_id_fk" | "vat_total" | "total_sum" | "order_id_fk";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  id!: number;
  nomenclature_id_fk?: number;
  unit_measure_id_fk?: number;
  amount?: number;
  cost?: number;
  total?: number;
  sale?: number;
  vat_rate_id_fk?: number;
  vat_total?: number;
  total_sum?: number;
  order_id_fk?: number;
  is_deleted!: boolean;

  // products belongsTo nomenclature via nomenclature_id_fk
  nomenclature_id_fk_nomenclature!: nomenclature;
  getNomenclature_id_fk_nomenclature!: Sequelize.BelongsToGetAssociationMixin<nomenclature>;
  setNomenclature_id_fk_nomenclature!: Sequelize.BelongsToSetAssociationMixin<nomenclature, nomenclatureId>;
  createNomenclature_id_fk_nomenclature!: Sequelize.BelongsToCreateAssociationMixin<nomenclature>;
  // products belongsTo orders via order_id_fk
  order_id_fk_order!: orders;
  getOrder_id_fk_order!: Sequelize.BelongsToGetAssociationMixin<orders>;
  setOrder_id_fk_order!: Sequelize.BelongsToSetAssociationMixin<orders, ordersId>;
  createOrder_id_fk_order!: Sequelize.BelongsToCreateAssociationMixin<orders>;
  // products belongsTo unit_measures via unit_measure_id_fk
  unit_measure_id_fk_unit_measure!: unit_measures;
  getUnit_measure_id_fk_unit_measure!: Sequelize.BelongsToGetAssociationMixin<unit_measures>;
  setUnit_measure_id_fk_unit_measure!: Sequelize.BelongsToSetAssociationMixin<unit_measures, unit_measuresId>;
  createUnit_measure_id_fk_unit_measure!: Sequelize.BelongsToCreateAssociationMixin<unit_measures>;
  // products belongsTo vat_rates via vat_rate_id_fk
  vat_rate_id_fk_vat_rate!: vat_rates;
  getVat_rate_id_fk_vat_rate!: Sequelize.BelongsToGetAssociationMixin<vat_rates>;
  setVat_rate_id_fk_vat_rate!: Sequelize.BelongsToSetAssociationMixin<vat_rates, vat_ratesId>;
  createVat_rate_id_fk_vat_rate!: Sequelize.BelongsToCreateAssociationMixin<vat_rates>;

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomenclature_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nomenclature',
        key: 'id'
      }
    },
    unit_measure_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'unit_measures',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sale: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    vat_rate_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vat_rates',
        key: 'id'
      }
    },
    vat_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total_sum: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
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
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
