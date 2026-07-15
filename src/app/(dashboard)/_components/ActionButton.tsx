import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"


export default function ActionButton({ children, action, redirectAfterComplate }: {
    children?: React.ReactNode,
    redirectAfterComplate?: string,
    action: () => Promise<{ success: boolean, message: string }>
}) {

    const [isDeletePending, startDeleteTransition] = useTransition()
    const router = useRouter()

    return (
        <AlertDialog>
            <AlertDialogTrigger render={children ?
                <button className="rounded bg-white">{children}</button> :
                <Button className="rounded bg-white" variant="ghost">
                    <Trash2Icon className="size-4 text-red-500" />
                </Button>} />


            <AlertDialogContent className="rounded">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        project from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="rounded"
                        disabled={isDeletePending}
                        onClick={() => {
                            startDeleteTransition(async () => {
                                try {
                                    const res = await action()
                                    if (!res.success) {
                                        toast.error(res.message)
                                    }
                                    toast.success(res.message)
                                    router.refresh()
                                    if (redirectAfterComplate) {
                                        router.replace(redirectAfterComplate)
                                    }
                                } catch (error) {
                                    toast.error(error instanceof Error ? error.message : "Failed to process action")
                                }
                            })
                        }}
                    >{isDeletePending ? "Processing" : "Continue"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
