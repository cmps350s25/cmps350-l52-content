import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

async function createNote(formData) {
  //title='note 5'&content='Note 5 details'

  'use server'
  const title = formData.get('title')
  const content = formData.get('content')

  // Define the path to db.json
  const filePath = path.join(process.cwd(), 'data', 'db.json')

  // Read existing data
  const fileData = await fs.readFile(filePath, 'utf-8')
  const jsonData = JSON.parse(fileData)

  // Ensure "notes" array exists
  if (!Array.isArray(jsonData.notes)) {
    jsonData.notes = []
  }

  // Append new note
  jsonData.notes.push({
    id: Date.now(), // Generate a unique ID
    title,
    content,
  })

  // Write back to file
  await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))

  // Revalidate the path to refresh the data
  revalidatePath('/notes')
}

export default function NoteEditor() {
  return (
    
    <form action={createNote}>
      <h3>Create a new note</h3>
      <input type="text" name="title" required placeholder="Title" />
      <br />
      <textarea name="content" required placeholder="Content"></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}