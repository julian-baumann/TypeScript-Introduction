import { Note } from "./Entities/Note.js";
import { HTMLRenderer } from "./HTMLRenderer.js";

class Application
{
    private data: Array<Note> = [];

    public constructor()
    {
        this.getDataAndWriteHTML();

        setInterval(this.getDataAndWriteHTML.bind(this), 10000);
    }

    private async getDataAndWriteHTML(): Promise<void>
    {
        this.data = await this.getDataFromServer();

        this.writeToHtml();
    }

    private async getDataFromServer(): Promise<Array<Note>>
    {
        const response: Response = await fetch("http://0.0.0.0:4000/v2/notes");
        return (await response.json()) as Array<Note>;
    }

    public writeToHtml(): void
    {
        const productsContainerElement: HTMLElement|null = document.getElementById("productsContainer");

        if (!productsContainerElement)
        {
            return;
        }

        for (const note of this.data)
        {
            const id: string = "note-" + note.id;

            const noteElement: HTMLDivElement = HTMLRenderer.getOrCreateElement("#" + id, "div", productsContainerElement);
            noteElement.classList.add("note");
            noteElement.id = id;

            const noteTextElement: HTMLDivElement = HTMLRenderer.getOrCreateElement("#" + id + " .text", "p", noteElement);
            noteTextElement.classList.add("text");
            noteTextElement.innerHTML = note.text;
        }
    }
}

new Application();
