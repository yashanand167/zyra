import { NextResponse } from 'next/server';

export interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

let notes: Note[] = [];

export async function GET() {
    return NextResponse.json(notes);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newNote: Note = {
            id: Date.now().toString(),
            title: body.title,
            description: body.description,
            createdAt: new Date().toISOString(),
        };

        notes.push(newNote);

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/notes:", error);
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, title, description } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Note ID is required' },
                { status: 400 }
            );
        }

        const noteIndex = notes.findIndex((n) => n.id === id);

        if (noteIndex === -1) {
            const newNote: Note = {
                id,
                title: title || 'Untitled Note',
                description: description !== undefined ? description : '',
                createdAt: body.createdAt || new Date().toISOString(),
            };
            notes.push(newNote);
            return NextResponse.json(newNote);
        }

        notes[noteIndex] = {
            ...notes[noteIndex],
            title: title || notes[noteIndex].title,
            description: description !== undefined ? description : notes[noteIndex].description,
        };

        return NextResponse.json(notes[noteIndex]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const deleteAll = url.searchParams.get('deleteAll');

        if (deleteAll === 'true') {
            notes = [];
            return NextResponse.json({ success: true });
        }

        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Note ID is required' },
                { status: 400 }
            );
        }

        const noteIndex = notes.findIndex((n) => n.id === id);

        if (noteIndex === -1) {
            return NextResponse.json(
                { error: 'Note not found' },
                { status: 404 }
            );
        }

        notes.splice(noteIndex, 1);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

export async function updateTitle(id: string, title: string) {
    try {
        const noteIndex = notes.findIndex((n) => n.id === id);

        if (noteIndex === -1) {
            const newNote: Note = {
                id,
                title: title || 'Untitled Note',
                description: '',
                createdAt: new Date().toISOString(),
            };
            notes.push(newNote);
            return NextResponse.json(newNote);
        }

        notes[noteIndex] = {
            ...notes[noteIndex],
            title: title || notes[noteIndex].title,
        };

        return NextResponse.json(notes[noteIndex]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}