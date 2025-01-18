import { DataTypes } from '@sequelize/core';
import sequelize from '../../common/configs/sequelize.config.js';

const Books = sequelize.define("books", {
    title: { type: DataTypes.STRING(255), allowNull: false },
    author: { type: DataTypes.STRING(255), allowNull: false },
    publisher: { type: DataTypes.STRING(255), allowNull: false },
    edition: { type: DataTypes.STRING(50) },
    language: { type: DataTypes.STRING(50), allowNull: false },
    genre: { type: DataTypes.STRING(100) },
    description: { type: DataTypes.TEXT },
    published_year: { type: DataTypes.INTEGER, allowNull: false },
    late_fee_per_day: { type: DataTypes.STRING(50), defaultValue: null },
    last_borrowed_date: { type: DataTypes.DATE, defaultValue: null },
    times_borrowed: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'available' },
}, { createdAt: "added_at", updatedAt: "updated_at" })

export default Books;