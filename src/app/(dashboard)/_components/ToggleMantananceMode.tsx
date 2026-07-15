"use client";

import { useState, useTransition } from "react";
import { Loader2, Wrench } from "lucide-react";
import toast from "react-hot-toast";

import { Switch } from "@/components/ui/switch";
import { updateMantananceMode } from "@/actions/setting";

type ToggleMaintenanceModeProps = {
    id: string;
    enabled: boolean;
};

export default function ToggleMaintenanceMode({
    id,
    enabled,
}: ToggleMaintenanceModeProps) {
    const [checked, setChecked] = useState(enabled);
    const [isPending, startTransition] = useTransition();

    function handleToggle(value: boolean) {
        setChecked(value);

        startTransition(async () => {
            const res = await updateMantananceMode(id, value);

            if (!res.success) {
                setChecked(!value);
                toast.error(res.message);
                return;
            }

            toast.success(
                value
                    ? "Maintenance mode enabled."
                    : "Maintenance mode disabled."
            );
        });
    }

    return (
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <div className="flex items-center gap-3">
                <div className="rounded-md bg-orange-500/10 p-2 text-orange-500">
                    <Wrench className="size-4" />
                </div>

                <div>
                    <p className="text-sm font-medium">Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">
                        {checked ? "Enabled" : "Disabled"}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
                {isPending && (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                )}

                <Switch
                    checked={checked}
                    disabled={isPending}
                    onCheckedChange={handleToggle}
                />
            </div>
        </div>
    );
}