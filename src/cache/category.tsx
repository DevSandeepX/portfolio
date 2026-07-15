import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { revalidateTag } from "next/cache";

export async function revalidateCategoryCache(id?: string) {
    revalidateTag(getGlobalTag("categories"), "max")
    if (id) {
        revalidateTag(getIdTag(id, "categories"), "max")
    }
}