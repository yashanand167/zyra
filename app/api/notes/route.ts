import { NextResponse } from 'next/server';

interface Note {
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
        const { title, description } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        const newNote: Note = {
            id: Date.now().toString(),
            title,
            description,
            createdAt: new Date().toISOString(),
        };

        notes.push(newNote);

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
