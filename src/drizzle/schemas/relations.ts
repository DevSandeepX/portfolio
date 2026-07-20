import { defineRelations } from "drizzle-orm";
import { blogTable } from "./blog";
import { categoryTable } from "./category";

const relations = defineRelations({ blogTable, categoryTable }, (r) => ({

    blogTable: {
        category: r.one.categoryTable({
            from: r.blogTable.categoryId,      // FK in blog table
            to: r.categoryTable.id,             // PK in category table
            optional: false,
        }),
    },


    categoryTable: {
        blogs: r.many.blogTable({
            from: r.categoryTable.id,          // PK in category table
            to: r.blogTable.categoryId,          // FK in blog table
        }),
    },
}));

