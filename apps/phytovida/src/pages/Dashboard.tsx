import { Button } from "@repo/ui/components/button";
import { Link } from "react-router";
import { useState } from "react";

type Tab = "growing" | "planning";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("growing");

    return (
    <div className="h-full grid place-content-center gap-6">
      <h1 className="text-headline">Welcome, username</h1>

      <div className="flex justify-center gap-3">

        <Button className="rounded-full" 
        variant={activeTab === "growing" ? "default" : "secondary"} 
        onClick={() => setActiveTab ("growing")}>
          Growing
        </Button>

        <Button className="rounded-full bg-accent3"
        variant={activeTab === "planning" ? "default" : "secondary"} 
        onClick={() => setActiveTab ("planning")}>
          Planning
        </Button>

      </div>

        <div>
        {activeTab === "growing" && <p>My Garden goes here</p>}
        {activeTab === "planning" && <p>Planting Queue goes here</p>}
      </div>

    </div>
    );
}