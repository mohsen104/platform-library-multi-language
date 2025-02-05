import { z } from "zod";
import BooksMessages from "./books.message.js";

const zBooks = z.object({
    title: z.string()
        .min(1, BooksMessages.title_required)
        .max(255, BooksMessages.title_max),

    author: z.string()
        .min(1, BooksMessages.author_required)
        .max(255, BooksMessages.author_max),

    publisher: z.string()
        .min(1, BooksMessages.publisher_required)
        .max(255, BooksMessages.publisher_max),

    edition: z.string()
        .max(50, BooksMessages.edition_max)
        .nullable()
        .optional(),

    language: z.string()
        .min(1, BooksMessages.language_required)
        .max(50, BooksMessages.language_max),

    genre: z.string()
        .max(100, BooksMessages.genre_max)
        .nullable()
        .optional(),

    description: z.string()
        .nullable()
        .optional(),

    published_year: z.number()
        .int(BooksMessages.published_year_int)
        .min(0, BooksMessages.published_year_min),

    late_fee_per_day: z.string()
        .max(50, BooksMessages.late_fee_max),

    quantity_available: z.number()
        .int(BooksMessages.quantity_available_int)
        .min(0, BooksMessages.quantity_available_min),
});

export default zBooks;
