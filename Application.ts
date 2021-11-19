import { ProductsData } from "./Entities/ProductsData.js"

class Application
{
    private data: ProductsData = new ProductsData();

    public constructor()
    {
        this.start();
    }

    private async start(): Promise<void>
    {
        this.data = await this.getDataFromServer();

        this.assignToHtml();
    }

    private async getDataFromServer(): Promise<ProductsData>
    {
        const response: Response = await fetch("http://pi.julba.de:5240/api/v1/products");
        return (await response.json()) as ProductsData;
    }

    public assignToHtml(): void
    {
        // const divElement: HTMLElement = document.getElementById("")
        // divElement.innerHTML = this.data.title;
    }
}

new Application();
