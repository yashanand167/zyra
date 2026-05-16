import { NextResponse } from 'next/server';
import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";

export interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
}

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notes = await prisma.note.findMany({
            where: { authorId: session.user.id },
            orderBy: { updatedAt: 'desc' }
        });

        return NextResponse.json(notes);
    } catch (error) {
        console.error("Error in GET /api/notes:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, id } = body;

        const newNote = await prisma.note.create({
            data: {
                id: id || undefined,
                title: title || "Untitled Note",
                description: description || "",
                authorId: session.user.id
            }
        });

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/notes:", error);
        return NextResponse.json({ error: "Failed to create note" }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { id, title, description } = body;

        if (!id) {
            return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
        }

        // Use updateMany first to ensure ownership, or findUnique
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote) {
            // Create if doesn't exist (original behavior)
            const newNote = await prisma.note.create({
                data: {
                    id,
                    title: title || "Untitled Note",
                    description: description || "",
                    authorId: session.user.id
                }
            });
            return NextResponse.json(newNote);
        }

        if (existingNote.authorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title: title !== undefined ? title : undefined,
                description: description !== undefined ? description : undefined,
            }
        });

        return NextResponse.json(updatedNote);
    } catch (error) {
        console.error("Error in PUT /api/notes:", error);
        return NextResponse.json({ error: "Failed to update note" }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const deleteAll = url.searchParams.get('deleteAll');

        if (deleteAll === 'true') {
            await prisma.note.deleteMany({
                where: { authorId: session.user.id }
            });
            return NextResponse.json({ success: true });
        }

        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
        }

        // Check ownership
        const note = await prisma.note.findUnique({ where: { id } });
        if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 });
        if (note.authorId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        await prisma.note.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in DELETE /api/notes:", error);
        return NextResponse.json({ error: "Failed to delete note" }, { status: 400 });
    }
}