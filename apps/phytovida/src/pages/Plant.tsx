import CreateUserPlantForm from '@/components/CreateUserPlantForm'
import { Button } from '@repo/ui/components/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@repo/ui/components/dialog';
import { FieldGroup, Field, FieldLabel } from '@repo/ui/components/field';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Input } from '@repo/ui/components/input';
import { Calendar } from '@repo/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover';

import { Plus, Sprout } from "lucide-react";
import { useState } from 'react';

const Plant = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <p>This is the page of a plant</p>
            <CreateUserPlantForm plantId="12" name="Tomato" />
            <Dialog>
                <DialogTrigger asChild><Button className=""><Plus /> Add to my garden</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Sprout className="w-3 h-3" />
                            ADD TO MY GARDEN
                        </DialogTitle>
                        <DialogDescription className="text-lg font-bold text-black lg:pl-4 md:pl-4">
                            Monstera deliciosa
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <FieldGroup>
                            {/* Phase: planning / growing */}
                            <Field orientation="horizontal" className="p-4 border-solid border-4 rounded-lg">
                                <Checkbox id="already-planted" />
                                <div className="grid gap-1">
                                    <FieldLabel htmlFor="already-planted">
                                        I’ve already planted it
                                    </FieldLabel>

                                    <span className="text-sm text-gray-500">
                                        Uncheck if you’re just planning to grow this one soon.
                                    </span>
                                </div>
                            </Field>

                            {/* Watering Frequency */}
                            <Field>
                                <FieldLabel>
                                    Watering Frequency
                                </FieldLabel>
                                <div className="flex items-center gap-2 border-solid border-4 rounded-lg">
                                    <Input
                                        className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        type='number'
                                        id="watering-frequency"
                                        placeholder='e.g. 8'
                                        min={1}
                                    />
                                    <span className="text-sm text-gray-500 pr-2">
                                        days
                                    </span>
                                </div>
                            </Field>
                            {/* Last watered date */}
                            <Field>
                                <FieldLabel>
                                    Last watered
                                </FieldLabel>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left">
                                            Select date
                                        </Button>
                                    </PopoverTrigger>
                                </Popover>
                            </Field>
                        </FieldGroup>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Plant
