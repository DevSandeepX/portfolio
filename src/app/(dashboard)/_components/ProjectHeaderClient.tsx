"use client"
import ActionButton from './ActionButton'
import { deleteProject } from '@/actions/project'

export default function ProjectHeaderClient({ id }: { id: string }) {
    return (
        <ActionButton action={deleteProject.bind(null, id)} redirectAfterComplate='/dashboard/projects'>
            <span className='text-red-600 py-2 px-4 rounded border border-red-700'>Delete Project</span>
        </ActionButton>
    )
}
