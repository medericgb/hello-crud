'use server';

import { revalidatePath } from "next/cache";
import prisma  from "./prisma";
import { redirect } from 'next/navigation';

export async function createNote(formData: FormData) {
  const text = formData.get('text') as string;

  await prisma.note.create({
    data: {
      text
    }
  })
  revalidatePath('/');
}

export async function updateNote(id: string, formData: FormData) {
  const text = formData.get('text') as string;

  await prisma.note.update({
    where: {
      id
    },
    data: {
      text
    }
  })
  revalidatePath('/');
  redirect('/');
}

export async function deleteNote(id: string) {
  await prisma.note.delete({
    where: {
      id
    }
  })
  revalidatePath('/');
}