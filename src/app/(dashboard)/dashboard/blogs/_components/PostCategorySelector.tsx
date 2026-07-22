"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export interface Category {
    id: string;
    name: string;
}

interface PostCategorySelectorProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    categories: Category[];
    placeholder?: string;
    disabled?: boolean;
}

export default function PostCategorySelector<T extends FieldValues>({
    control,
    name,
    categories,
    placeholder = "Select category",
    disabled,
}: PostCategorySelectorProps<T>) {
    const [open, setOpen] = React.useState(false);

    const {
        field: { value, onChange },
    } = useController({
        control,
        name,
    });

    const selectedCategory = (categories ?? []).find(
        (category) => category.id === value
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={<Button
                type="button"
                variant="outline"
                disabled={disabled}
                className="w-full justify-between"
            >
                {selectedCategory?.name ?? placeholder}

                <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>} />


            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />

                    <CommandEmpty>No category found.</CommandEmpty>

                    <CommandGroup>
                        {categories.map((category) => (
                            <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                    onChange(category.id);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={`mr-2 h-4 w-4 ${value === category.id ? "opacity-100" : "opacity-0"
                                        }`}
                                />
                                {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}