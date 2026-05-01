import { Button } from '@repo/ui/components/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@repo/ui/components/dialog'

interface PropTypes {
    open: boolean,
    setOpen: any,
    title: string,
    description: string,
    discardButton: { text: string },
    actionButton: { text: string, bgColor: string }
}
const AlertCard = ({ open, setOpen, title, description, discardButton, actionButton }: PropTypes) => {
    return (
        <Dialog
            open={open}
            onOpenChange={() => setOpen(false)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className='flex gap-4 justify-end'>
                    <Button
                        onClick={() => setOpen(false)}
                        className="bg-white hover:bg-gray-200 border-2 border-gray-200 text-black shadow-none">
                        {discardButton.text}
                    </Button>
                    <Button
                        className={`${actionButton.bgColor} hover:${actionButton.bgColor}`}>
                        {actionButton.text}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AlertCard
