import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { revalidateTag } from "next/cache";

export function revalidateProjectCache(id?: string) {
    revalidateTag(getGlobalTag("projects"), "max")
    if (id) {
        revalidateTag(getIdTag(id, "projects"), "max")
    }

}