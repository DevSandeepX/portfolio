import { UserButton } from '@clerk/nextjs';
import { CgDetailsMore } from "react-icons/cg";
import ToggleMaintenanceMode from './ToggleMantananceMode';
import { getAppSetting } from '@/db/setting';

export default async function DashboardNav() {
    const setting = await getAppSetting()
    return (
        <div className='h-14 md:h-16 lg:h-18 px-4  bg-white shadow-sm flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <CgDetailsMore className='size-6' />
                <span className='font-semibold'>  Dashboard</span>
            </div>
            <div className='flex items-center gap-2'>
                <ToggleMaintenanceMode enabled={setting?.isMantananceMode!} id={setting?.id!} />
                <UserButton />
            </div>
        </div>
    )
}
