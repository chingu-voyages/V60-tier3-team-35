import { Link } from "react-router";
import { Button } from "@repo/ui/components/button";

export function LocationCard() {

    return (
        <>
            <h2>London, UK – Spring</h2>
            <p>Spring in London is a wonderful time for gardening with mild temperatures (15–25°C / 59–77°F), some April showers that help establish new plantings, and long sunny days.</p>
            <Button className="rounded-full bg-accent2" variant="secondary" asChild>
                <Link to="/">Change location</Link>
            </Button>
            </>

            );

}

