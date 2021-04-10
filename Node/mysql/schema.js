module.exports = function () {
    const Sequelize = require('sequelize');
    const { db } = require('../Config/config');
    const sequelize = new Sequelize(db.mysql_db, db.mysql_user, db.mysql_password, {
        host: db.mysql_host,
        port: db.mysql_port,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000
        },
        define: {
            timestamps: false
        }
    });

    sequelize.authenticate().then(() => {
        console.log('Connection Authenticated');
    }).catch(err => {
        console.log(err.stack);
    });

    const Product = sequelize.define('products', {
        p_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        description: {
            type: Sequelize.STRING
        },
        price: Sequelize.STRING,
        image: {
            type: Sequelize.STRING,
            defaultValue: 'unknown.png'
        }
    });

    const Cart = sequelize.define('carts', {
        c_id: { type: Sequelize.STRING, primaryKey: true },
        items: {
            type: Sequelize.STRING,
            references: 'products', //table name
            referencesKey: 'p_id' //coloumn name in the table
        }
    });

    Cart.hasMany(Product, { foreignKey: 'items' });

    return {
        models: {
            Product,
            Cart
        }
    }
}
