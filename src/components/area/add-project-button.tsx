import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";

export function AddProjectButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  async function addProject() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: "Neues Projekt",
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Das Hinzufügen des Projekts ist fehlgeschlagen.");
      }

      await response.json();

      // Seite neu laden
      location.reload();
    } catch (err: any) {
      setError(err.message || "Unbekannter Fehler");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Projekt hinzufügen</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Projekt hinzufügen</DialogTitle>
          <DialogDescription>
            Füge ein Projekt zur Liste hinzu.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="col-span-3"
            />
          </div>
          {error && <p className="text-sm text-red-600 col-span-4">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={addProject}
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? "Hinzufügen..." : "Hinzufügen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
