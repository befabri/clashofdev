import { defineCollection, z } from "astro:content";

const characters = defineCollection({
    schema: z.object({
        title: z.string(),
        order: z.number(),
        category: z.string(),
        point: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        bgColor: z.string(),
        icon: z.object({
            name: z.string(),
            color: z.string(),
            size: z.string().optional(),
        }),
        cursors: z.array(
            z.object({
                title: z.string(),
                color: z.enum(["pink", "green", "blue", "mustard", "orange", "purple"]),
            })
        ),
    }),
});

export const collections = { characters };
