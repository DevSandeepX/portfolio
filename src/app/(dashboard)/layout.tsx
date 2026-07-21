
export default function MarkettingPage({ children }: {
    children: React.ReactNode
}) {


    return (
        <div className='flex flex-col'>
            <main className='mt-16'>
                {children}
            </main>
        </div>
    )
}
