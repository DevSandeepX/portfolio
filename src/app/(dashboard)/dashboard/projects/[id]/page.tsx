import BackButton from '@/app/(dashboard)/_components/BackButton'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'
import ProjectHeaderClient from '@/app/(dashboard)/_components/ProjectHeaderClient'
import ProjectSettingsForm from '@/app/(dashboard)/_components/ProjectSettingsForm'
import CustomNotFound from '@/components/CustomNotFound'
import { getProject } from '@/db/product'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function ProjectIdPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <div className='w-full'>
            <BackButton title='Projects' href='/dashboard/projects' />
            <div className='flex justify-between gap-4 items-start mt-8'>
                <PageHeader
                    title="Update Project"
                    description="Edit your project details and save the changes."
                />

                <ProjectHeaderClient id={id} />
            </div>

            <Suspense fallback={<p>Skeleton</p>}>
                <SuspendedPage id={id} />
            </Suspense>
        </div>
    )
}


async function SuspendedPage({ id }: {
    id: string
}) {
    const project = await getProject(id)
    if (!project) {
        return (
            <CustomNotFound
                title='Project not found'
                description="The project you' re looking for doesn't exist or may have been removed."
                actionHref='/dashboard/projects'
                actionLabel='Browse Projects'
            />
        )
    }

    return (
        <ProjectSettingsForm
            project={project}

        />
    )
}