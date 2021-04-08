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

    const User = sequelize.define('users', {
        email: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'MRE'
        },
        password: Sequelize.STRING,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        image: {
            type: Sequelize.STRING,
            defaultValue: 'unknown.jpg'
        },
        language: {
            type: Sequelize.STRING,
            defaultValue: 'en',
            references: 'languages', //table name
            referencesKey: 'language_locale' //coloumn name in the table
        },
        user_warehouse: {
            type: Sequelize.STRING,
            references: 'warehouses', //table name
            referencesKey: 'warehouse_code' //coloumn name in the table
        },
        phone: {
            type: Sequelize.STRING,
            uniqueKey: true,
            defaultValue: null
        },
        address: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        created_on: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        last_login: {
            type: Sequelize.DATE
        }
    });

    const Bin = sequelize.define('bins', {
        bin_code: { type: Sequelize.STRING, primaryKey: true },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        threshold: {
            type: Sequelize.INTEGER,
            defaultValue: 15
        },
        bin_device: {
            type: Sequelize.STRING,
            references: 'devices', //table name
            referencesKey: 'device_code' //coloumn name in the table
        },
        bin_product: {
            type: Sequelize.STRING,
            references: 'products', //table name
            referencesKey: 'product_code' //coloumn name in the table
        },
        bin_warehouse: {
            type: Sequelize.STRING,
            references: 'warehouses', //table name
            referencesKey: 'warehouse_code' //coloumn name in the table
        },
        bin_location: {
            type: Sequelize.STRING,
            references: 'locations', //table name
            referencesKey: 'location_code' //coloumn name in the table
        },
        bin_stock: {
            type: Sequelize.INTEGER,
            defaultValue: 100
        },
        created_on: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    const Product = sequelize.define('products', {
        product_code: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        product_name: Sequelize.STRING,
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        product_category: {
            type: Sequelize.STRING,
            defaultValue: 'Mechanical'
        },
        product_image: {
            type: Sequelize.STRING,
            defaultValue: 'unknown.png'
        },
    });

    // Device_Type.hasMany(Device, { foreignKey: 'device_category', sourceKey: 'type' });
    // Device.belongsTo(Device_Type, { foreignKey: 'device_category', targetKey: 'type' });

    return {
        models: {
            User,
            Product,
            Bin
        }
    }
}
