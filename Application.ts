import { ProductsData } from "./Entities/ProductsData.js"

class Application
{
    private data: ProductsData = new ProductsData();

    public constructor()
    {
        this.writeDataFromServerToHTML();

        setInterval(this.writeDataFromServerToHTML.bind(this), 10000);
    }

    private async writeDataFromServerToHTML(): Promise<void>
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
        const productsContainerElement: HTMLElement|null = document.getElementById("productsContainer");

        if (!productsContainerElement)
        {
            return;
        }

        for (const product of this.data.products)
        {
            const productsDiv: HTMLElement = document.createElement("div");
            productsDiv.classList.add("product");

            const productImageElement: HTMLImageElement = document.createElement("img");
            productImageElement.src = product.imageSource;
            productImageElement.classList.add("image");


            //                                              <p></p>
            const nameParagraphElement: HTMLElement = document.createElement("p");
            nameParagraphElement.innerHTML = product.name; // <p>product name</p>
            nameParagraphElement.classList.add("name");


            const priceParagraphElement: HTMLElement = document.createElement("p");
            priceParagraphElement.innerHTML = `${product.price.toString()} €`;
            priceParagraphElement.classList.add("price");


            productsDiv.appendChild(nameParagraphElement);
            productsDiv.appendChild(productImageElement);
            productsDiv.appendChild(priceParagraphElement);


    
            productsContainerElement.appendChild(productsDiv);
        }
    }
}

new Application();
