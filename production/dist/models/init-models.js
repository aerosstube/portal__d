"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.vat_rates = exports.users = exports.user_roles = exports.user_devices = exports.unit_measures = exports.tokens = exports.products = exports.organizations_has_users = exports.organizations = exports.orders = exports.order_status = exports.nomenclature = exports.counterparty_types = exports.counterparties = exports.clients_has_users = exports.clients = void 0;
const clients_1 = require("./clients");
Object.defineProperty(exports, "clients", { enumerable: true, get: function () { return clients_1.clients; } });
const clients_has_users_1 = require("./clients_has_users");
Object.defineProperty(exports, "clients_has_users", { enumerable: true, get: function () { return clients_has_users_1.clients_has_users; } });
const counterparties_1 = require("./counterparties");
Object.defineProperty(exports, "counterparties", { enumerable: true, get: function () { return counterparties_1.counterparties; } });
const counterparty_types_1 = require("./counterparty_types");
Object.defineProperty(exports, "counterparty_types", { enumerable: true, get: function () { return counterparty_types_1.counterparty_types; } });
const nomenclature_1 = require("./nomenclature");
Object.defineProperty(exports, "nomenclature", { enumerable: true, get: function () { return nomenclature_1.nomenclature; } });
const order_status_1 = require("./order_status");
Object.defineProperty(exports, "order_status", { enumerable: true, get: function () { return order_status_1.order_status; } });
const orders_1 = require("./orders");
Object.defineProperty(exports, "orders", { enumerable: true, get: function () { return orders_1.orders; } });
const organizations_1 = require("./organizations");
Object.defineProperty(exports, "organizations", { enumerable: true, get: function () { return organizations_1.organizations; } });
const organizations_has_users_1 = require("./organizations_has_users");
Object.defineProperty(exports, "organizations_has_users", { enumerable: true, get: function () { return organizations_has_users_1.organizations_has_users; } });
const products_1 = require("./products");
Object.defineProperty(exports, "products", { enumerable: true, get: function () { return products_1.products; } });
const tokens_1 = require("./tokens");
Object.defineProperty(exports, "tokens", { enumerable: true, get: function () { return tokens_1.tokens; } });
const unit_measures_1 = require("./unit_measures");
Object.defineProperty(exports, "unit_measures", { enumerable: true, get: function () { return unit_measures_1.unit_measures; } });
const user_devices_1 = require("./user_devices");
Object.defineProperty(exports, "user_devices", { enumerable: true, get: function () { return user_devices_1.user_devices; } });
const user_roles_1 = require("./user_roles");
Object.defineProperty(exports, "user_roles", { enumerable: true, get: function () { return user_roles_1.user_roles; } });
const users_1 = require("./users");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return users_1.users; } });
const vat_rates_1 = require("./vat_rates");
Object.defineProperty(exports, "vat_rates", { enumerable: true, get: function () { return vat_rates_1.vat_rates; } });
function initModels(sequelize) {
    const clients = clients_1.clients.initModel(sequelize);
    const clients_has_users = clients_has_users_1.clients_has_users.initModel(sequelize);
    const counterparties = counterparties_1.counterparties.initModel(sequelize);
    const counterparty_types = counterparty_types_1.counterparty_types.initModel(sequelize);
    const nomenclature = nomenclature_1.nomenclature.initModel(sequelize);
    const order_status = order_status_1.order_status.initModel(sequelize);
    const orders = orders_1.orders.initModel(sequelize);
    const organizations = organizations_1.organizations.initModel(sequelize);
    const organizations_has_users = organizations_has_users_1.organizations_has_users.initModel(sequelize);
    const products = products_1.products.initModel(sequelize);
    const tokens = tokens_1.tokens.initModel(sequelize);
    const unit_measures = unit_measures_1.unit_measures.initModel(sequelize);
    const user_devices = user_devices_1.user_devices.initModel(sequelize);
    const user_roles = user_roles_1.user_roles.initModel(sequelize);
    const users = users_1.users.initModel(sequelize);
    const vat_rates = vat_rates_1.vat_rates.initModel(sequelize);
    clients_has_users.belongsTo(clients, { as: "client_id_fk_client", foreignKey: "client_id_fk" });
    clients.hasMany(clients_has_users, { as: "clients_has_users", foreignKey: "client_id_fk" });
    counterparties.belongsTo(clients, { as: "client_id_fk_client", foreignKey: "client_id_fk" });
    clients.hasMany(counterparties, { as: "counterparties", foreignKey: "client_id_fk" });
    orders.belongsTo(clients, { as: "client_id_fk_client", foreignKey: "client_id_fk" });
    clients.hasMany(orders, { as: "orders", foreignKey: "client_id_fk" });
    orders.belongsTo(counterparties, { as: "counterparty_id_fk_counterparty", foreignKey: "counterparty_id_fk" });
    counterparties.hasMany(orders, { as: "orders", foreignKey: "counterparty_id_fk" });
    counterparties.belongsTo(counterparty_types, { as: "counterparty_type_id_fk_counterparty_type", foreignKey: "counterparty_type_id_fk" });
    counterparty_types.hasMany(counterparties, { as: "counterparties", foreignKey: "counterparty_type_id_fk" });
    products.belongsTo(nomenclature, { as: "nomenclature_id_fk_nomenclature", foreignKey: "nomenclature_id_fk" });
    nomenclature.hasMany(products, { as: "products", foreignKey: "nomenclature_id_fk" });
    orders.belongsTo(order_status, { as: "order_status_id_fk_order_status", foreignKey: "order_status_id_fk" });
    order_status.hasMany(orders, { as: "orders", foreignKey: "order_status_id_fk" });
    products.belongsTo(orders, { as: "order_id_fk_order", foreignKey: "order_id_fk" });
    orders.hasMany(products, { as: "products", foreignKey: "order_id_fk" });
    orders.belongsTo(organizations, { as: "organization_id_fk_organization", foreignKey: "organization_id_fk" });
    organizations.hasMany(orders, { as: "orders", foreignKey: "organization_id_fk" });
    organizations_has_users.belongsTo(organizations, { as: "organization_id_fk_organization", foreignKey: "organization_id_fk" });
    organizations.hasMany(organizations_has_users, { as: "organizations_has_users", foreignKey: "organization_id_fk" });
    nomenclature.belongsTo(unit_measures, { as: "unit_measure_id_fk_unit_measure", foreignKey: "unit_measure_id_fk" });
    unit_measures.hasMany(nomenclature, { as: "nomenclatures", foreignKey: "unit_measure_id_fk" });
    products.belongsTo(unit_measures, { as: "unit_measure_id_fk_unit_measure", foreignKey: "unit_measure_id_fk" });
    unit_measures.hasMany(products, { as: "products", foreignKey: "unit_measure_id_fk" });
    tokens.belongsTo(user_devices, { as: "user_device_id_fk_user_device", foreignKey: "user_device_id_fk" });
    user_devices.hasMany(tokens, { as: "tokens", foreignKey: "user_device_id_fk" });
    users.belongsTo(user_roles, { as: "user_role_id_fk_user_role", foreignKey: "user_role_id_fk" });
    user_roles.hasMany(users, { as: "users", foreignKey: "user_role_id_fk" });
    clients_has_users.belongsTo(users, { as: "user_id_fk_user", foreignKey: "user_id_fk" });
    users.hasMany(clients_has_users, { as: "clients_has_users", foreignKey: "user_id_fk" });
    organizations_has_users.belongsTo(users, { as: "user_id_fk_user", foreignKey: "user_id_fk" });
    users.hasMany(organizations_has_users, { as: "organizations_has_users", foreignKey: "user_id_fk" });
    tokens.belongsTo(users, { as: "user_id_fk_user", foreignKey: "user_id_fk" });
    users.hasMany(tokens, { as: "tokens", foreignKey: "user_id_fk" });
    products.belongsTo(vat_rates, { as: "vat_rate_id_fk_vat_rate", foreignKey: "vat_rate_id_fk" });
    vat_rates.hasMany(products, { as: "products", foreignKey: "vat_rate_id_fk" });
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
exports.initModels = initModels;
