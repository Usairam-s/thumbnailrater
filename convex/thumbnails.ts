import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const createThumbnail = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity(); // this know is user sign in
    if (!user) {
      throw new Error("You must be logged in to create thumbnail");
    }
    await ctx.db.insert("thumbnails", {
      title: args.title,
      userId: user.subject,
    });
  },
});

export const getThumbnailForUser = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity(); // this know is user sign in
    if (!user) {
      return [];
      throw new Error("You must be logged in to create thumbnail");
    }
    return await ctx.db
      .query("thumbnails") //tbalee name
      .filter((q) => q.eq(q.field("userId"), user.subject)) // userId
      .collect();
  },
});
