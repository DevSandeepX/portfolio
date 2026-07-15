"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
    CategoryFormInput,
    categorySchema
} from "@/schemas/category"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"
import toast from "react-hot-toast"
import { createCategory, updateCategory } from "@/actions/category"
import { useRouter } from "next/navigation"

export default function CreateCategoryForm({ category, categories }: {
    categories: {
        id: string;
        title: string;
    }[],
    category?: {
        id: string;
        slug: string;
        title: string;
        createdAt: Date;
        description: string | null;
        parentId: string | null;
        updatedAt: Date;
    }
}) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { isSubmitting, isValid },
    } = useForm<CategoryFormInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: category?.title || "",
            description: category?.description || "",
            type: category?.parentId ? "SUB" : "MAIN",
            parentId: category?.parentId || "",
            slug: category?.slug || "",
        },
    })

    const type = watch("type")
    const router = useRouter()


    async function onSubmit(values: CategoryFormInput) {
        const action = category ?
            updateCategory.bind(null, category.id) :
            createCategory

        try {
            const response = await action(values)
            if (!response.success) {
                toast.error(response.message);
                return
            }

            toast.success(response.message)
            reset()
            router.refresh()
            router.push("/dashboard/categories")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Internal error")
        }
    }

    return (
        <Card className="rounded-xl">
            <CardHeader>
                <CardTitle>Create Category</CardTitle>
                <CardDescription>
                    Create a main category or organize content under an
                    existing category.
                </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Category Type */}

                    <div className="space-y-3">
                        <Label>Category Type</Label>

                        <RadioGroup
                            defaultValue={category?.parentId ? "SUB" : "MAIN"}
                            onValueChange={(v) =>
                                setValue("type", v as "MAIN" | "SUB")
                            }
                            className="flex gap-8"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem
                                    value="MAIN"
                                    id="main"
                                />
                                <Label htmlFor="main">
                                    Main Category
                                </Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <RadioGroupItem
                                    value="SUB"
                                    id="sub"
                                />
                                <Label htmlFor="sub">
                                    Sub Category
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Parent Category */}

                    {type === "SUB" && (
                        <div className="space-y-2 ">
                            <Label>Parent Category</Label>

                            <Select
                                defaultValue={category?.parentId}
                                onValueChange={(v) => {
                                    setValue("parentId", v as string);
                                }}

                            >
                                <SelectTrigger className="max-w-[220px] w-full rounded border">
                                    <SelectValue placeholder="Select parent category" />
                                </SelectTrigger>

                                <SelectContent className="max-w-[220px] w-full rounded border">
                                    {Array.isArray(categories) && categories.map((cat) => (
                                        <SelectItem value={cat.id} key={cat.id}>
                                            {cat.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Two Columns */}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Category Title</Label>

                            <Input
                                {...register("title")}
                                placeholder="Web Development"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Slug</Label>

                            <Input
                                {...register("slug")}
                                placeholder="web-development"
                            />
                        </div>
                    </div>

                    {/* Description */}

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Textarea
                            {...register("description")}
                            className="min-h-32 resize-none"
                            placeholder="Write a short description..."
                        />
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            type="button"
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                        >
                            {isSubmitting
                                ? "Saving..."
                                : "Save Category"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}