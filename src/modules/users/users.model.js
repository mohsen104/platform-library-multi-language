import { DataTypes } from '@sequelize/core';
import sequelize from '../../common/configs/sequelize.config.js';

const Users = sequelize.define("users", {
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    national_code: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    borrow_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    blocked_reason: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
}, { timestamps: true, createdAt: "added_at", updatedAt: "updated_at" })

export default Users;