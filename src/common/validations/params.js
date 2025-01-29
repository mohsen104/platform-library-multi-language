import { z } from "zod";

const zParams = z.object({
    id: z.number({ message: "ID must be a number." }).optional().nullable(),
});

export { zParams };
