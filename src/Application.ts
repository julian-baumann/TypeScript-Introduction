import { Note } from "./Entities/Note.js";

class Application
{
    private data: Array<Note> = [];

    public constructor()
    {
        this.getDataAndWriteHTML();

        // setInterval(this.getDataAndWriteHTML.bind(this), 10000);
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
            const productsDiv: HTMLElement = document.createElement("div");
            productsDiv.classList.add("note");

            const nameParagraphElement: HTMLElement = document.createElement("p");
            nameParagraphElement.innerHTML = note.text;
            nameParagraphElement.classList.add("text");

            productsDiv.appendChild(nameParagraphElement);


            productsContainerElement.appendChild(productsDiv);
        }
    }
}

new Application();
