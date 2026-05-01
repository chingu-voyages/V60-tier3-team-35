import { Button } from '@repo/ui/components/button'
import { Pencil } from 'lucide-react'

const WateringFrequencyCard = () => {
    return (
        <div className="flex items-center mt-4">
            <div><span className="font-medium text-4xl">Every 7</span> <span>days</span></div>
            <Button variant="ghost"
                className="ml-auto bg-white border-1 border-black rounded-xl shadow-none hover:bg-gray-300 p-0 text-black-500">
                <Pencil /> Edit</Button>
        </div>
    )
}

export default WateringFrequencyCard
