import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Check, X } from "lucide-react"

const WateringFrequencyEdit = ({ setEditMode }: { setEditMode: any }) => {
    return (
        <div className="flex mt-4">
            <div className="flex gap-2 items-center">
                <p>Every</p>
                <Input type="number" defaultValue="--" className="w-30 bg-white" />
                <p>days</p>
            </div>
            <div className="flex gap-2 ml-auto">
                <Button
                    className="rounded-4xl bg-white text-black hover:bg-gray-100"
                    onClick={() => setEditMode(false)}
                ><X /></Button>
                <Button className="rounded-4xl"><Check /></Button>
            </div>
        </div>
    )
}

export default WateringFrequencyEdit
