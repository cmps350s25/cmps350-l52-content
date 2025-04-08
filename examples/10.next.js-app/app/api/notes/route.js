import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dbFilePath = path.join(process.cwd(), "data", "db.json");

export async function POST(req) {
  try {
    const { note } = await req.json();

    if (!note) {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    const data = await fs.readFile(dbFilePath, "utf-8");
    const json = JSON.parse(data);

    json.Notes = json.Notes || [];
    json.Notes.push(note);

    await fs.writeFile(dbFilePath, JSON.stringify(json, null, 2));

    return NextResponse.json(
      { message: "Note added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(dbFilePath, "utf-8");
    const json = JSON.parse(data);

    return NextResponse.json(json.Notes || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}
