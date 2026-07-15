import CustomNotFound from '@/components/CustomNotFound'
import { getPublicProjectBySlug } from '@/db/product'
import ProjectDetails from '../../_components/ProjectDetailsPage'

export default async function ProjectSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return (
        <div className='container min-h-screen'>
            <SuspendedPage slug={slug} />
        </div>
    )
}


async function SuspendedPage({ slug }: { slug: string }) {
    const project = await getPublicProjectBySlug(slug)


    if (!project) {
        return (
            <CustomNotFound
                title="Project Not Found"
                description="The project you're looking for doesn't exist or may have been removed."
                actionLabel="Browse Projects"
                actionHref="/projects"
            />
        );
    }

    return (
        <ProjectDetails project={project} />
    )

}