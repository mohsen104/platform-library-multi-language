import { z } from "zod";

const zBooks = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(255, "Title must be at most 255 characters"),

    author: z.string()
        .min(1, "Author is required")
        .max(255, "Author must be at most 255 characters"),

    publisher: z.string()
        .min(1, "Publisher is required")
        .max(255, "Publisher must be at most 255 characters"),

    edition: z.string()
        .max(50, "Edition must be at most 50 characters")
        .nullable()
        .optional(),

    language: z.string()
        .min(1, "Language is required")
        .max(50, "Language must be at most 50 characters"),

    genre: z.string()
        .max(100, "Genre must be at most 100 characters")
        .nullable()
        .optional(),

    description: z.string()
        .nullable()
        .optional(),

    published_year: z.number()
        .int("Published year must be an integer")
        .min(0, "Published year must be positive"),

    late_fee_per_day: z
        .string()
        .max(50, "Late fee must be at most 50 characters")
        .nullable()
        .optional(),

    last_borrowed_date: z.date()
        .nullable()
        .optional(),

    times_borrowed: z
        .number()
        .int("Times borrowed must be an integer")
        .min(0, "Times borrowed cannot be negative")
        .nullable()
        .optional(),

    status: z
        .string()
        .min(1, "Status is required")
        .max(50, "Status must be at most 50 characters")
        .default("available"),

});

export default zBooks;
