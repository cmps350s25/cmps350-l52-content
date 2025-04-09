import React from 'react'
import styles from '../Notes.module.css'
import path from 'path'
import { promises as fs } from 'fs'

const getNote = async (noteId) => {
  const filePath = path.join(process.cwd(), 'data', 'db.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const notes = JSON.parse(jsonData).notes
  return notes.find(note => note.id == noteId)
}

const NotePage = async ({ params }) => {
  const { id } = await params;
  console.log("noteId", id);
  const note = await getNote(id);
  if (!note) {
    return <div>Note not found</div>
  }
  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
      </div>
    </div>
  )
}

export default NotePage
