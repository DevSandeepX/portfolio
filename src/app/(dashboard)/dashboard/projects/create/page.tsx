import BackButton from "@/app/(dashboard)/_components/BackButton";
import CreateProjectForm from "@/app/(dashboard)/_components/CreateProjectForm";

export default function ProjectCreatePage() {
    return (
        <div className="w-full">
            <div className="space-y-2">
                <BackButton title="Projects" href="/dashboard/projects" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Create Project
                </h1>
                <p className="text-muted-foreground">
                    Add a new project to your portfolio.
                </p>
            </div>

            <CreateProjectForm />
        </div>
    );
}