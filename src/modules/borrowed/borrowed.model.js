import { DataTypes } from '@sequelize/core';
import sequelize from '../../common/configs/sequelize.config.js';
import Users from '../users/users.model.js';
import Books from '../books/books.model.js';

const Borrowed = sequelize.define("borrowed", {
    returned_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    borrowed_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fine_amount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("borrowed", "returned"),
        allowNull: true,
        defaultValue: 'borrowed'
    }
}, { timestamps: false });

Books.hasOne(Borrowed, {
    foreignKey: {
        name: "book_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
});

Users.hasOne(Borrowed, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE"
    },
    sourceKey: "id"
});

export default Borrowed;