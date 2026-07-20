"use server"
import { MUTATION } from "../db/setting"

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