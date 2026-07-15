import CreateSkillForm from '@/app/(dashboard)/_components/CreateSkillForm'
import CustomNotFound from '@/components/CustomNotFound'
import { getAllCategories } from '@/db/category'
import { getSkillById } from '@/db/skill'
import { notFound } from 'next/navigation'

export default async function SkillIdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <SuspendedForm id={id} />
    )
}


async function SuspendedForm({ id }: { id: string }) {
    const [skill, categories] = await Promise.all([
        getSkillById(id),
        getAllCategories(),
    ])

    if (!skill) {
        return (
            <CustomNotFound
                title='Skill not found'
                description="The skill you' re looking for doesn't exist or may have been removed."
                actionHref='/dashboard/skills'
                actionLabel='Browse Skills'
            />
        )
    }

    return (
        <CreateSkillForm skill={skill} categories={categories} />
    )
}