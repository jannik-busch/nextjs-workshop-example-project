import { NextRequest, NextResponse } from "next/server";
import { Project } from "../../types/types";

// In-Memory Speicherung der Projekte
export const projects: Project[] = [
  {
    id: 0,
    status: "success",
    name: "Next.js Workshop (Vorbereitung)",
    description: "Der Workshop für Next.js soll vorbereitet werden.",
  },
  {
    id: 1,
    status: "in_progress",
    name: "Next.js Workshop",
    description: "Der Workshop für Next.js soll durchgeführt werden",
  },
];

// GET-Handler: Liste aller Projekte oder ein Projekt nach ID abrufen
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const project = projects.find((p) => p.id === parseInt(id));
    if (project) {
      return NextResponse.json(project);
    } else {
      return NextResponse.json(
        { error: "Projekt nicht gefunden" },
        { status: 404 },
      );
    }
  } else {
    return NextResponse.json(projects);
  }
}

// POST-Handler: Neues Projekt hinzufügen
export async function POST(request: NextRequest) {
  try {
    const {
      name,
      description,
      status,
    }: { name: string; description: string; status: Project["status"] } =
      await request.json();

    if (!name || !description || !status) {
      return NextResponse.json(
        { error: "Name, Beschreibung und Status sind erforderlich" },
        { status: 400 },
      );
    }

    const newProject: Project = {
      id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 0,
      name,
      description,
      status,
    };

    projects.push(newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }
}

// PUT-Handler: Bestehendes Projekt aktualisieren
export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      name,
      description,
      status,
    }: {
      id: number;
      name: string;
      description: string;
      status: Project["status"];
    } = await request.json();

    if (id === undefined || !name || !description || !status) {
      return NextResponse.json(
        { error: "ID, Name, Beschreibung und Status sind erforderlich" },
        { status: 400 },
      );
    }

    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { error: "Projekt nicht gefunden" },
        { status: 404 },
      );
    }

    // Projekt aktualisieren
    projects[projectIndex] = {
      id,
      name,
      description,
      status,
    };

    return NextResponse.json(projects[projectIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }
}
