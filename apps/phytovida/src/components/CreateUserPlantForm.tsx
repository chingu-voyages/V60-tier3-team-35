import { useCreateUserPlant } from '@/hooks/user-plants/useUserPlant';
import React, { useState } from 'react'

const CreateUserPlantForm = ({ plantId }: { plantId: string }) => {
    const addUserPlantMutation = useCreateUserPlant();

    const [plantInfo, setPlantInfo] = useState({
        plantId,
        phase: "planning",
        wateringFrequency: null,
        lastWateredDate: null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setPlantInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? "growing" : "planning") : value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Submitting form with data:", plantInfo);
        e.preventDefault();
        try {
            addUserPlantMutation.mutate(plantInfo,
                {
                    onSuccess: () => {
                        console.log("User plant created successfully!");
                    }
                }
            )
        } catch (error) {
            console.error("Error creating user plant:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    name="phase"
                    type="checkbox"
                    checked={plantInfo.phase === "growing"}
                    onChange={handleInputChange} />
                <label >I already planted this plant {plantInfo.plantId}</label>
            </div>
            <div>
                <label className="pr-4">Watering frequency</label>
                <input
                    name="wateringFrequency"
                    type="number"
                    min={1}
                    value={plantInfo.wateringFrequency ? plantInfo.wateringFrequency : ''}
                    onChange={handleInputChange}
                />
                <span>days</span>
            </div>
            <div>
                <label>Last watered date</label>
                <input
                    name="lastWateredDate"
                    type="date"
                    value={plantInfo.lastWateredDate || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input type="submit" value="Create Plant" />
            </div>
        </form>
    )
}

export default CreateUserPlantForm
