import { z } from "zod";
import UsersMessages from "./users.message.js";

const zUsers = z.object({
    first_name: z.string()
        .min(1, UsersMessages.first_name_required)
        .max(255, UsersMessages.first_name_max),

    last_name: z.string()
        .min(1, UsersMessages.last_name_required)
        .max(255, UsersMessages.last_name_max),

    age: z.number()
        .int(UsersMessages.age_int)
        .min(0, UsersMessages.age_min)
        .max(120, UsersMessages.age_max),

    city: z.string()
        .min(1, UsersMessages.city_required)
        .max(255, UsersMessages.city_max),

    national_code: z.string()
        .length(10, UsersMessages.national_code_length),

    phone_number: z.string()
        .min(10, UsersMessages.phone_number_min)
        .max(15, UsersMessages.phone_number_max),

    address: z.string()
        .min(1, UsersMessages.address_required)
        .max(255, UsersMessages.address_max),
});

export default zUsers;
