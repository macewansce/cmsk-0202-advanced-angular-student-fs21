Create an Angular project with any name you wish.

Create a Product model. Here is a snippet of the data:
{
  "products": [
    {
      "id": "P001",
      "name": "Laptop",
      "category": "Electronics",
      "price": 999.99,
      "stock": 100,
      "description": "A high-performance laptop suitable for gaming and professional work."
    },
    {
      "id": "P002",
      "name": "Smartphone",
      "category": "Electronics",
      "price": 599.99,
      "stock": 200,
      "description": "A latest-generation smartphone with advanced camera features."
    }
  ]
}

Create a json file for a list of Product data.

Create a Product service. Add a method getProductList. This method needs to return an observable of an array containing the Product Data created above. Hint: Use HttpClient to read the data.

Create a Product component and register it. Use the component in the default AppComponent template. Hint: Template is the component’s http file.

Subscribe to getProductList method of the Product service.

Display the product list returned by the getProductList method of the Product service.