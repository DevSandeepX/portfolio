import React from 'react'

type EmptyStateProps = {
    title: string;
    description?: string;
    children?: React.ReactNode
};

export function EmptyState({
    title,
    description,
    children
}: EmptyStateProps) {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 p-8 text-center">
            <h2 className="text-xl font-semibold tracking-tight">
                {title}
            </h2>

            {description && (
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            {children && (<div>
                {children}
            </div>)}
        </div>
    );
}