import { ColumnDef } from "@tanstack/react-table";
import { ProjectTable } from "@/src/components/area/project-table";
import { Project } from "./types/types";

// Definieren der Tabellen-Spalten
export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

// Funktion zum Abrufen der Daten
async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`http://localhost:3000/api/projects`, {
    cache: "no-store", // Verhindert das Cachen der API-Daten
  });

  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Projekte");
  }

  return response.json();
}

export default async function Home() {
  // Daten werden auf dem Server abgerufen
  const projects = await fetchProjects();

  return (
    <main className="p-8">
      {/* Daten und Spalten werden an die ProjectTable-Komponente übergeben */}
      <ProjectTable columns={columns} data={projects} />
    </main>
  );
}
