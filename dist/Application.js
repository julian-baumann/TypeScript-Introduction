var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProductsData } from "./Entities/ProductsData.js";
class Application {
    constructor() {
        this.data = new ProductsData();
        this.getDataAndWriteHTML();
        setInterval(this.getDataAndWriteHTML.bind(this), 10000);
    }
    getDataAndWriteHTML() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield this.getDataFromServer();
            this.writeToHtml();
        });
    }
    getDataFromServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("http://pi.julba.de:5240/api/v1/products");
            return (yield response.json());
        });
    }
    writeToHtml() {
        const productsContainerElement = document.getElementById("productsContainer");
        if (!productsContainerElement) {
            return;
        }
        for (const product of this.data.products) {
            const productsDiv = document.createElement("div");
            productsDiv.classList.add("product");
            const productImageElement = document.createElement("img");
            productImageElement.src = product.imageSource;
            productImageElement.classList.add("image");
            //                                                   <p></p> 
            const nameParagraphElement = document.createElement("p");
            nameParagraphElement.innerHTML = product.name; // <p>product name</p>
            nameParagraphElement.classList.add("name");
            const priceParagraphElement = document.createElement("p");
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
//# sourceMappingURL=Application.js.map