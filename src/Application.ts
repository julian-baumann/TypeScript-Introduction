import { ProductsData } from "./Entities/ProductsData.js"
import { HTMLRenderer } from "./HTMLRenderer.js";

class Application
{
    private data: ProductsData = new ProductsData();
    private count: number = 0;

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

    private async getDataFromServer(): Promise<ProductsData>
    {
        const response: Response = await fetch("http://pi.julba.de:5240/api/v1/products");
        return (await response.json()) as ProductsData;
    }

    public writeToHtml(): void
    {
        const productsContainerElement: HTMLElement|null = document.getElementById("productsContainer");

        if (!productsContainerElement)
        {
            return;
        }

        for (const product of this.data.products)
        {
            const id: string = `product-${product.id}`;

            const productsDiv: HTMLElement = HTMLRenderer.getOrCreateElement(`#${id}`, "div", productsContainerElement);
            productsDiv.classList.add("product");
            productsDiv.id = id;


            const productImageElement: HTMLImageElement = HTMLRenderer.getOrCreateElement(`#${id} > .image`, "img", productsDiv);
            productImageElement.src = product.imageSource;
            productImageElement.classList.add("image");


            const nameParagraphElement: HTMLElement = HTMLRenderer.getOrCreateElement(`#${id} > .name`, "p", productsDiv);
            nameParagraphElement.innerHTML = product.name;
            nameParagraphElement.classList.add("name");


            const priceParagraphElement: HTMLElement = HTMLRenderer.getOrCreateElement(`#${id} > .price`, "p", productsDiv);
            priceParagraphElement.innerHTML = `${(product.price + this.count).toFixed(2)}€`;
            priceParagraphElement.classList.add("price");
        }

        this.count++;
    }
}

new Application();
