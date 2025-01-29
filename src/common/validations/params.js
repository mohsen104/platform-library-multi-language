import { z } from "zod";

const zParams = z.object({
    id: z.number().int("ID must be a number.").optional().nullable(),
});

export { zParams };
