import { redirect } from "next/navigation"
import { MUTATION, QUERIES } from "../db/setting"

export const ACTIONS = {
    async createSetting() {
        try {
            await MUTATION.createSetting();
            return {
                success: true,
            };
        } catch (error) {
            console.error(error);

            return {
                success: false,
            };
        }
    },
};