import { createNote, deleteNote } from "@/lib/actions";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const notes = await prisma.note.findMany();

  return (
    <main className="flex min-h-screen flex-col p-14">
      <h1 className="text-2xl font-bold">Hello CRUD</h1>
      <div className="z-10 max-w-5xl w-full text-sm flex mt-10">
        <form action={createNote} className="flex flex-col space-y-2">
          <label htmlFor="note">Note</label>
          <textarea
            name="text"
            id="text"
            cols={30}
            rows={10}
            className="border border-black"
          />
          <button type="submit" className="p-2 bg-blue-500">
            Créer une nouvelle note
          </button>
        </form>
      </div>

      {/* All notes */}
      <div className="mt-8 space-y-4">
        <h2 className="font-bold underline">Notes</h2>
        <div className="space-y-3 flex flex-col">
          {notes.map((note) => {
            const deleteNoteWithId = deleteNote.bind(null, note?.id);
            return (
              <div
                className="underline inline-flex items-center space-x-2"
              >
                <Link href={`/notes/${note.id}`} className="underline">
                  {note.text}
                </Link>
                <form action={deleteNoteWithId}>
                  <input type="hidden" name="id" value={note.id} />
                  <button type="submit" className="p-1 bg-red-500 text-white">Supprimer</button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
