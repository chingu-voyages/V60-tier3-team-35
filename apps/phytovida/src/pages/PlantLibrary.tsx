import { Button } from "@repo/ui/components/button";
import { Link } from "react-router";
import { useApiClient } from "@/lib/authFetch";
import type { ApiPaginatedResponse, DbPlant } from "@repo/types";
import { useCallback, useEffect, useRef, useState } from "react";


export default function PlantLibrary() {
    const [loading, setLoading] = useState(false);
    const [allPlants, setAllPlants] = useState<DbPlant[]>([]);
    const { apiClient } = useApiClient();
    const [error, setError] = useState("");

    const loadingRef = useRef(false);

    const fetchAllPlants = useCallback(async () => {
        if (loadingRef.current) return;

        try {
            loadingRef.current = true;
            setLoading(true);
            setError("");

            const data: ApiPaginatedResponse<DbPlant> = await apiClient.get(
                `/plants`,
            );

            console.log(data);

            setAllPlants((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const filtered = data.data.filter((p) => !existingIds.has(p.id));
                return [...prev, ...filtered];
            });
        } catch (error) {
            setError((error as Error).message);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [apiClient]);


    useEffect(() => {
        fetchAllPlants();
    }, [fetchAllPlants]);


    return (

        <div className="h-full grid place-content-center gap-6">
            <h1 className="flex justify-center py-8 text-headline">
                Plant Library
            </h1>
            <p>Browse our plant database to find out more about your favourite plants and choose what to grow next.</p>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {loading && <p className="text-center">Loading plants...</p>}

            {!loading && allPlants.length > 0 && (
                <ul className="grid grid-cols-2 gap-4">
                    {allPlants.map((plant) => (
                        <li key={plant.id} className="border rounded p-4">
                            {plant.imageUrl && (
                                <img src={plant.imageUrl} alt={plant.name} className="w-full rounded mb-2" />
                            )}
                            <p className="font-semibold">{plant.name}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex justify-center gap-3">
                <Button className="rounded-full" variant="secondary" asChild>
                    <Link to="/">Discover more</Link>
                </Button>
            </div>

        </div>

    );

}