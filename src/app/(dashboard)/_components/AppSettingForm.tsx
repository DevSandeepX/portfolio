"use client";

import { Controller, useForm } from "react-hook-form";
import {
    Globe,
    Search,
    User,
    Share2,
    Briefcase,
    Loader2,
    ExternalLink,
    FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AppSettingFormInput } from "@/schemas/setting";
import { updateAppSetting } from "@/actions/setting";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FileUploader from "./FileUploader";
import Image from "next/image";
import Link from "next/link";

export type AppSetting = {
    setting: {
        id: string;
        siteTitle: string;
        siteDescription: string | null;
        siteUrl: string | null;
        faviconUrl: string | null;
        seoTitle: string | null;
        seoDescription: string | null;
        seoKeywords: string | null;
        experienceYears: number | null;

        fullName: string;
        designation: string;
        email: string | null;
        phone: string | null;
        location: string | null;
        profileImage: string | null;
        resumeUrl: string | null;

        githubUrl: string | null;
        linkedinUrl: string | null;
        twitterUrl: string | null;
        instagramUrl: string | null;
        youtubeUrl: string | null;
        facebookUrl: string | null;

        isAvailableForWork: boolean;

        createdAt: Date;
        updatedAt: Date;
    };
};


export default function AppSettingForm({
    setting,
}: AppSetting) {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<AppSettingFormInput>({
        defaultValues: setting,
    });

    const router = useRouter()

    async function onSubmit(values: AppSettingFormInput) {
        try {
            const res = await updateAppSetting(setting.id, values)
            if (!res.success) {
                toast.error(res.message)
                return
            }

            toast.success(res.message)
            router.refresh()

        } catch (error) {
            toast.error("Internal error")
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        <CardTitle>General Settings</CardTitle>
                    </div>

                    <CardDescription>
                        Configure your portfolio information.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="space-y-2">
                            <Label>Site Title</Label>
                            <Input
                                {...register("siteTitle")}
                                placeholder="My Portfolio"
                            />
                            {errors.siteTitle && (
                                <p className="text-sm text-destructive">
                                    {errors.siteTitle.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Website URL</Label>
                            <Input
                                {...register("siteUrl")}
                                placeholder="https://example.com"
                            />
                        </div>

                    </div>

                    <div className="space-y-2">
                        <Label>Site Description</Label>

                        <Textarea
                            rows={5}
                            {...register("siteDescription")}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="favicon">Favicon</Label>

                        {setting.faviconUrl && (
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <div className="h-16 w-16 overflow-hidden rounded-md border bg-muted">
                                    <Image
                                        src={setting.faviconUrl}
                                        alt="Favicon"
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">Current Favicon</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {setting.faviconUrl}
                                    </p>
                                </div>
                            </div>
                        )}

                        <FileUploader
                            endpoint="siteFavicon"
                            onUpload={(res) => {
                                setValue("faviconUrl", res?.[0]);
                            }}
                        />

                        <p className="text-xs text-muted-foreground">
                            Recommended size: <strong>512 × 512 px</strong>. PNG, JPG, or WebP.
                        </p>
                    </div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        <CardTitle>SEO Settings</CardTitle>
                    </div>

                    <CardDescription>
                        Improve your website visibility in search engines.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="seoTitle">SEO Title</Label>

                        <Input
                            id="seoTitle"
                            placeholder="Best Full Stack Developer Portfolio"
                            {...register("seoTitle")}
                        />

                        {errors.seoTitle && (
                            <p className="text-sm text-destructive">
                                {errors.seoTitle.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="seoDescription">
                            SEO Description
                        </Label>

                        <Textarea
                            id="seoDescription"
                            rows={5}
                            placeholder="Short SEO description..."
                            {...register("seoDescription")}
                        />

                        {errors.seoDescription && (
                            <p className="text-sm text-destructive">
                                {errors.seoDescription.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="seoKeywords">
                            SEO Keywords
                        </Label>

                        <Input
                            id="seoKeywords"
                            placeholder="React, Next.js, Portfolio, Developer"
                            {...register("seoKeywords")}
                        />

                        <p className="text-xs text-muted-foreground">
                            Separate keywords with commas (,).
                        </p>

                        {errors.seoKeywords && (
                            <p className="text-sm text-destructive">
                                {errors.seoKeywords.message}
                            </p>
                        )}
                    </div>

                </CardContent>
            </Card><Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <CardTitle>Personal Information</CardTitle>
                    </div>

                    <CardDescription>
                        Manage the personal information displayed on your portfolio.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-2">

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>

                        <Input
                            id="fullName"
                            placeholder="John Doe"
                            {...register("fullName")}
                        />

                        {errors.fullName && (
                            <p className="text-sm text-destructive">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Designation */}
                    <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>

                        <Input
                            id="designation"
                            placeholder="Full Stack Developer"
                            {...register("designation")}
                        />

                        {errors.designation && (
                            <p className="text-sm text-destructive">
                                {errors.designation.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>

                        <Input
                            id="phone"
                            placeholder="+91 9876543210"
                            {...register("phone")}
                        />

                        {errors.phone && (
                            <p className="text-sm text-destructive">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Experience</Label>

                        <Input
                            id="experience"
                            placeholder="2 Year +"
                            type="number"
                            {...register("experienceYears", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.experienceYears && (
                            <p className="text-sm text-destructive">
                                {errors.experienceYears.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>

                        <Input
                            id="location"
                            placeholder="Lucknow, India"
                            {...register("location")}
                        />

                        {errors.location && (
                            <p className="text-sm text-destructive">
                                {errors.location.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2 grid grid-cols-1 gap-6 lg:grid-cols-2">

                        <div className="space-y-3 rounded-xl border p-5">
                            <Label>Profile Image</Label>

                            {setting.profileImage && (
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <div className="h-24 w-24 overflow-hidden rounded-full border bg-muted">
                                        <Image
                                            src={setting.profileImage}
                                            alt="Profile"
                                            width={96}
                                            height={96}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1 text-center sm:text-left">
                                        <h4 className="font-medium">Current Profile</h4>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {setting.profileImage}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <FileUploader
                                endpoint="profileImage"
                                onUpload={(res) => setValue("profileImage", res?.[0])}
                            />

                            <p className="text-xs text-muted-foreground">
                                PNG, JPG, JPEG, WebP • Max 4 MB
                            </p>
                        </div>


                        {/* Resume URL */}
                        <div className="space-y-3 rounded-xl border p-5">
                            <Label>Resume</Label>

                            {setting.resumeUrl && (
                                <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                                            <FileText className="h-6 w-6" />
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="font-medium">
                                                Current Resume
                                            </h4>

                                            <p className="truncate text-xs text-muted-foreground">
                                                {setting.resumeUrl}
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="outline">
                                        <Link href={setting.resumeUrl} target="_blank" className="flex">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            )}

                            <FileUploader
                                endpoint="resume"
                                onUpload={(res) => setValue("resumeUrl", res?.[0])}
                            />

                            <p className="text-xs text-muted-foreground">
                                PDF only • Max 4 MB
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        <CardTitle>Social Links</CardTitle>
                    </div>

                    <CardDescription>
                        Add your social media and professional profile links.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-2">

                    {/* GitHub */}
                    <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub</Label>

                        <Input
                            id="githubUrl"
                            placeholder="https://github.com/username"
                            {...register("githubUrl")}
                        />

                        {errors.githubUrl && (
                            <p className="text-sm text-destructive">
                                {errors.githubUrl.message}
                            </p>
                        )}
                    </div>

                    {/* LinkedIn */}
                    <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn</Label>

                        <Input
                            id="linkedinUrl"
                            placeholder="https://linkedin.com/in/username"
                            {...register("linkedinUrl")}
                        />

                        {errors.linkedinUrl && (
                            <p className="text-sm text-destructive">
                                {errors.linkedinUrl.message}
                            </p>
                        )}
                    </div>

                    {/* Twitter / X */}
                    <div className="space-y-2">
                        <Label htmlFor="twitterUrl">Twitter / X</Label>

                        <Input
                            id="twitterUrl"
                            placeholder="https://x.com/username"
                            {...register("twitterUrl")}
                        />

                        {errors.twitterUrl && (
                            <p className="text-sm text-destructive">
                                {errors.twitterUrl.message}
                            </p>
                        )}
                    </div>

                    {/* Instagram */}
                    <div className="space-y-2">
                        <Label htmlFor="instagramUrl">Instagram</Label>

                        <Input
                            id="instagramUrl"
                            placeholder="https://instagram.com/username"
                            {...register("instagramUrl")}
                        />

                        {errors.instagramUrl && (
                            <p className="text-sm text-destructive">
                                {errors.instagramUrl.message}
                            </p>
                        )}
                    </div>

                    {/* YouTube */}
                    <div className="space-y-2">
                        <Label htmlFor="youtubeUrl">YouTube</Label>

                        <Input
                            id="youtubeUrl"
                            placeholder="https://youtube.com/@username"
                            {...register("youtubeUrl")}
                        />

                        {errors.youtubeUrl && (
                            <p className="text-sm text-destructive">
                                {errors.youtubeUrl.message}
                            </p>
                        )}
                    </div>

                    {/* Facebook */}
                    <div className="space-y-2">
                        <Label htmlFor="facebookUrl">Facebook</Label>

                        <Input
                            id="facebookUrl"
                            placeholder="https://facebook.com/username"
                            {...register("facebookUrl")}
                        />

                        {errors.facebookUrl && (
                            <p className="text-sm text-destructive">
                                {errors.facebookUrl.message}
                            </p>
                        )}
                    </div>

                </CardContent>
            </Card>

            {/* -------------------- Career Settings -------------------- */}

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        <CardTitle>Career Settings</CardTitle>
                    </div>

                    <CardDescription>
                        Control your professional availability shown on your portfolio.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Controller
                        control={control}
                        name="isAvailableForWork"
                        render={({ field }) => (
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-1">
                                    <Label>Available for Work</Label>

                                    <p className="text-sm text-muted-foreground">
                                        Display an "Available for Work" badge on your website.
                                    </p>
                                </div>

                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </div>
                        )}
                    />
                </CardContent>
            </Card>

            {/* -------------------- Submit -------------------- */}

            <div className="sticky bottom-0 z-10 flex justify-end border-t bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="min-w-40"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Settings"
                    )}
                </Button>
            </div>

        </form>
    );
}