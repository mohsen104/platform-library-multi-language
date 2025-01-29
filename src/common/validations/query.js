import { z } from "zod";

const zQuery = z.object({
    q: z.string().optional().nullable(),
    order_by: z.string(),
    sort_order: z.enum(["asc", "desc"]),
    limit: z.number(),
    page: z.number(),
});

export { zQuery };
