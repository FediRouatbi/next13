import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import z from "zod";
const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({ accept: ["image/*"] })
    .input(
      z.object({
        category: z.string(),
        userId: z.string(),
        userRole: z.string(),
      })
    )
    .path(({ ctx, input }) => [
      { category: input.category },
      { author: input.userId },
    ])
    .metadata(({ ctx, input }) => ({
      userRole: input.userRole,
    })),
});
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
