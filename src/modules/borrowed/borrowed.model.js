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
    borrow_fee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 0
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