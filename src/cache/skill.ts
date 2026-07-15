import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { revalidateTag } from "next/cache";

export function revalidateSkillCache(id?: string, categoryId?: string) {
    revalidateTag(getGlobalTag("skills"), "max")
    if (id) {
        revalidateTag(getIdTag(id, "skills"), "max")
    }

    if (categoryId) {
        revalidateTag(getIdTag(categoryId, "categories"), "max")
    }
}