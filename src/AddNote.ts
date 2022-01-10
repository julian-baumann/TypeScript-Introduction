import { Note } from "./Entities/Note.js";

class AddNote
{
    public constructor()
    {
        const addNoteButton: HTMLButtonElement = document.getElementById("addNoteButton") as HTMLButtonElement;
        addNoteButton.onclick = this.addNote.bind(this);
    }

    private getText(): string
    {
        const textArea: HTMLTextAreaElement = document.getElementById("noteText") as HTMLTextAreaElement;
        return textArea.value;
    }

    private async addNote(): Promise<void>
    {
        const text: string = this.getText();

        if (text?.length <= 0)
        {
            return;
        }

        const newNote: Note = new Note();
        newNote.text = text;

        const response: Response = await fetch("http://0.0.0.0:4000/v2/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })

        if (response.status == 201)
        {
            location.href = "index.html";
        }
    }
}

new AddNote();