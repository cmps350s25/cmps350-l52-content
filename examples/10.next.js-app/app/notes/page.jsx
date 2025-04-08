import Link from 'next/link'
import styles from './Notes.module.css'
import {readFile} from 'node:fs/promises'
import path from 'path'
import NoteEditor from './NoteEditor'

const getNotes = async () => {
  //const notesData = await fetch('http://localhost:3000/api/notes')
  // apiKey
  //return await notesData.json()
  const filePath = path.join(process.cwd(), 'data', 'db.json')
  const data = await readFile(filePath, "utf-8");
  const json = JSON.parse(data);
  return json.notes
}

export default async function NotesPage() {
  const notes = await getNotes()
  console.log(notes)

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes && notes?.map((note) => {
          return <Note key={note.id} note={note} />
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <NoteEditor />
      </div>
    </div>
  )
}

function Note({ note }) {
  const { id, title, content } = note // || {}

  return (
      <div className={styles.note}>
        <Link href={`/notes/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{content}</p>
      </div>
  )
}
