import { updateNote } from "@/lib/actions";
import prisma from "@/lib/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const updateNoteWithId = updateNote.bind(null, id);
  const note = await prisma.note.findUnique({ where: { id } });

  return (
    <div className="container mx-auto">
      <form action={updateNoteWithId} className="flex flex-col space-y-2 w-2/3 p-1">
        <label htmlFor="note">Note {id}</label>
        <textarea
          name="text"
          id="text"
          cols={30}
          rows={10}
          className="border border-black"
          defaultValue={note?.text}
        />
        <button type="submit" className="p-2 bg-blue-500">
          Mettre à jour nouvelle note
        </button>
      </form>
    </div>
  );
}
