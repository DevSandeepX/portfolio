"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { SkillFormInput, skillSchema } from "@/schemas/skill";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createSkill, updateSkill } from "@/actions/skill";
import { useRouter } from "next/navigation";

export default function CreateSkillForm({
    categories,
    skill
}: {
    skill?: {
        id: string;
        title: string;
        description: string | null;
        categoryId: string;
    },
    categories: {
        id: string;
        title: string;
    }[];
}) {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<SkillFormInput>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            title: skill?.title || "",
            description: skill?.description || "",
            categoryId: skill?.categoryId || "",
        },
    });

    const categoryId = watch("categoryId");
    const router = useRouter()

    async function onSubmit(values: SkillFormInput) {
        const action = skill ? updateSkill.bind(null, skill.id) : createSkill

        try {
            const response = await action(values);

            if (!response.success) {
                return toast.error(response.message);
            }

            toast.success(response.message);
            reset()
            router.refresh()
            router.replace(`/dashboard/skills`)
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-xl border bg-background p-6"
        >
            <div className="grid gap-5 md:grid-cols-2">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Skill Title
                    </label>

                    <Input
                        placeholder="React.js"
                        {...register("title")}
                    />

                    {errors.title && (
                        <p className="text-sm text-destructive">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Category
                    </label>

                    <Select
                        value={categoryId}
                        onValueChange={(value) =>
                            setValue("categoryId", value as string, {
                                shouldValidate: true,
                            })
                        }
                    >
                        <SelectTrigger className="w-[320px] rounded">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors.categoryId && (
                        <p className="text-sm text-destructive">
                            {errors.categoryId.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Description
                </label>

                <Textarea
                    rows={6}
                    placeholder="Write a short description..."
                    {...register("description")}
                />

                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded"
            >
                {isSubmitting ? "Saving..." : "Save Skill"}
            </Button>
        </form>
    );
}