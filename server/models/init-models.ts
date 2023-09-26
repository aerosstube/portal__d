import type { Sequelize } from "sequelize";
import { clients as _clients } from "./clients";
import type { clientsAttributes, clientsCreationAttributes } from "./clients";
import { clients_has_users as _clients_has_users } from "./clients_has_users";
import type { clients_has_usersAttributes, clients_has_usersCreationAttributes } from "./clients_has_users";
import { counterparties as _counterparties } from "./counterparties";
import type { counterpartiesAttributes, counterpartiesCreationAttributes } from "./counterparties";
import { counterparty_types as _counterparty_types } from "./counterparty_types";
import type { counterparty_typesAttributes, counterparty_typesCreationAttributes } from "./counterparty_types";
import { nomenclature as _nomenclature } from "./nomenclature";
import type { nomenclatureAttributes, nomenclatureCreationAttributes } from "./nomenclature";
import { order_status as _order_status } from "./order_status";
import type { order_statusAttributes, order_statusCreationAttributes } from "./order_status";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { organizations as _organizations } from "./organizations";
import type { organizationsAttributes, organizationsCreationAttributes } from "./organizations";
import { organizations_has_users as _organizations_has_users } from "./organizations_has_users";
import type { organizations_has_usersAttributes, organizations_has_usersCreationAttributes } from "./organizations_has_users";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";
import { tokens as _tokens } from "./tokens";
import type { tokensAttributes, tokensCreationAttributes } from "./tokens";
import { unit_measures as _unit_measures } from "./unit_measures";
import type { unit_measuresAttributes, unit_measuresCreationAttributes } from "./unit_measures";
import { user_devices as _user_devices } from "./user_devices";
import type { user_devicesAttributes, user_devicesCreationAttributes } from "./user_devices";
import { user_roles as _user_roles } from "./user_roles";
import type { user_rolesAttributes, user_rolesCreationAttributes } from "./user_roles";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";
import { vat_rates as _vat_rates } from "./vat_rates";
import type { vat_ratesAttributes, vat_ratesCreationAttributes } from "./vat_rates";

export {
  _clients as clients,
  _clients_has_users as clients_has_users,
  _counterparties as counterparties,
  _counterparty_types as counterparty_types,
  _nomenclature as nomenclature,
  _order_status as order_status,
  _orders as orders,
  _organizations as organizations,
  _organizations_has_users as organizations_has_users,
  _products as products,
  _tokens as tokens,
  _unit_measures as unit_measures,
  _user_devices as user_devices,
  _user_roles as user_roles,
  _users as users,
  _vat_rates as vat_rates,
};

export type {
  clientsAttributes,
  clientsCreationAttributes,
  clients_has_usersAttributes,
  clients_has_usersCreationAttributes,
  counterpartiesAttributes,
  counterpartiesCreationAttributes,
  counterparty_typesAttributes,
  counterparty_typesCreationAttributes,
  nomenclatureAttributes,
  nomenclatureCreationAttributes,
  order_statusAttributes,
  order_statusCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  organizationsAttributes,
  organizationsCreationAttributes,
  organizations_has_usersAttributes,
  organizations_has_usersCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  tokensAttributes,
  tokensCreationAttributes,
  unit_measuresAttributes,
  unit_measuresCreationAttributes,
  user_devicesAttributes,
  user_devicesCreationAttributes,
  user_rolesAttributes,
  user_rolesCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  vat_ratesAttributes,
  vat_ratesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const clients = _clients.initModel(sequelize);
  const clients_has_users = _clients_has_users.initModel(sequelize);
  const counterparties = _counterparties.initModel(sequelize);
  const counterparty_types = _counterparty_types.initModel(sequelize);
  const nomenclature = _nomenclature.initModel(sequelize);
  const order_status = _order_status.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const organizations = _organizations.initModel(sequelize);
  const organizations_has_users = _organizations_has_users.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const tokens = _tokens.initModel(sequelize);
  const unit_measures = _unit_measures.initModel(sequelize);
  const user_devices = _user_devices.initModel(sequelize);
  const user_roles = _user_roles.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const vat_rates = _vat_rates.initModel(sequelize);

  clients_has_users.belongsTo(clients, { as: "client_id_fk_client", foreignKey: "client_id_fk"});
  clients.hasMany(clients_has_users, { as: "clients_has_users", foreignKey: "client_id_fk"});
  counterparties.belongsTo(clients, { as: "client_id_fk_client", foreignKey: "client_id_fk"});
  clients.hasMany(counterparties, { as: "counterparties", foreignKey: "client_id_fk"});
  orders.belongsTo(clients, { as: "client_id_fk_client", foreignKey: "client_id_fk"});
  clients.hasMany(orders, { as: "orders", foreignKey: "client_id_fk"});
  orders.belongsTo(counterparties, { as: "counterparty_id_fk_counterparty", foreignKey: "counterparty_id_fk"});
  counterparties.hasMany(orders, { as: "orders", foreignKey: "counterparty_id_fk"});
  counterparties.belongsTo(counterparty_types, { as: "counterparty_type_id_fk_counterparty_type", foreignKey: "counterparty_type_id_fk"});
  counterparty_types.hasMany(counterparties, { as: "counterparties", foreignKey: "counterparty_type_id_fk"});
  products.belongsTo(nomenclature, { as: "nomenclature_id_fk_nomenclature", foreignKey: "nomenclature_id_fk"});
  nomenclature.hasMany(products, { as: "products", foreignKey: "nomenclature_id_fk"});
  orders.belongsTo(order_status, { as: "order_status_id_fk_order_status", foreignKey: "order_status_id_fk"});
  order_status.hasMany(orders, { as: "orders", foreignKey: "order_status_id_fk"});
  products.belongsTo(orders, { as: "order_id_fk_order", foreignKey: "order_id_fk"});
  orders.hasMany(products, { as: "products", foreignKey: "order_id_fk"});
  orders.belongsTo(organizations, { as: "organization_id_fk_organization", foreignKey: "organization_id_fk"});
  organizations.hasMany(orders, { as: "orders", foreignKey: "organization_id_fk"});
  organizations_has_users.belongsTo(organizations, { as: "organization_id_fk_organization", foreignKey: "organization_id_fk"});
  organizations.hasMany(organizations_has_users, { as: "organizations_has_users", foreignKey: "organization_id_fk"});
  nomenclature.belongsTo(unit_measures, { as: "unit_measure_id_fk_unit_measure", foreignKey: "unit_measure_id_fk"});
  unit_measures.hasMany(nomenclature, { as: "nomenclatures", foreignKey: "unit_measure_id_fk"});
  products.belongsTo(unit_measures, { as: "unit_measure_id_fk_unit_measure", foreignKey: "unit_measure_id_fk"});
  unit_measures.hasMany(products, { as: "products", foreignKey: "unit_measure_id_fk"});
  tokens.belongsTo(user_devices, { as: "user_device_id_fk_user_device", foreignKey: "user_device_id_fk"});
  user_devices.hasMany(tokens, { as: "tokens", foreignKey: "user_device_id_fk"});
  users.belongsTo(user_roles, { as: "user_role_id_fk_user_role", foreignKey: "user_role_id_fk"});
  user_roles.hasMany(users, { as: "users", foreignKey: "user_role_id_fk"});
  clients_has_users.belongsTo(users, { as: "user_id_fk_user", foreignKey: "user_id_fk"});
  users.hasMany(clients_has_users, { as: "clients_has_users", foreignKey: "user_id_fk"});
  organizations_has_users.belongsTo(users, { as: "user_id_fk_user", foreignKey: "user_id_fk"});
  users.hasMany(organizations_has_users, { as: "organizations_has_users", foreignKey: "user_id_fk"});
  tokens.belongsTo(users, { as: "user_id_fk_user", foreignKey: "user_id_fk"});
  users.hasMany(tokens, { as: "tokens", foreignKey: "user_id_fk"});
  products.belongsTo(vat_rates, { as: "vat_rate_id_fk_vat_rate", foreignKey: "vat_rate_id_fk"});
  vat_rates.hasMany(products, { as: "products", foreignKey: "vat_rate_id_fk"});

  return {
    clients: clients,
    clients_has_users: clients_has_users,
    counterparties: counterparties,
    counterparty_types: counterparty_types,
    nomenclature: nomenclature,
    order_status: order_status,
    orders: orders,
    organizations: organizations,
    organizations_has_users: organizations_has_users,
    products: products,
    tokens: tokens,
    unit_measures: unit_measures,
    user_devices: user_devices,
    user_roles: user_roles,
    users: users,
    vat_rates: vat_rates,
  };
}
