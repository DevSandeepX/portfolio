import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { revalidateTag } from "next/cache";

export function revalidateAppSettingCache(id?: string) {
    revalidateTag(getGlobalTag("settings"), "max")
    if (id) {
        revalidateTag(getIdTag(id, "settings"), "max")
    }
}