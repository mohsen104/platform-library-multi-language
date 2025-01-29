import { z } from "zod";

const zUsers = z.object({
    first_name: z.string()
        .min(1, "First name is required")
        .max(255, "First name must be at most 255 characters"),

    last_name: z.string()
        .min(1, "Last name is required")
        .max(255, "Last name must be at most 255 characters"),

    age: z.number()
        .int("Age must be an integer")
        .min(0, "Age must be a positive number")
        .max(120, "Age must be realistic"),

    city: z.string()
        .min(1, "City is required")
        .max(255, "City must be at most 255 characters"),

    national_code: z.string()
        .length(10, "National code must be exactly 10 characters"),

    phone_number: z.string()
        .min(10, "Phone number must be at least 10 characters")
        .max(15, "Phone number must be at most 15 characters"),

    borrow_limit: z.number()
        .int("Borrow limit must be an integer")
        .default(0),

    address: z.string()
        .min(1, "Address is required")
        .max(255, "Address must be at most 255 characters"),

    is_blocked: z.boolean()
        .default(false),

    blocked_reason: z.string()
        .max(255, "Blocked reason must be at most 255 characters")
        .nullable()
        .optional(),
});

export default zUsers;
