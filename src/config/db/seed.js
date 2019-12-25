const db = require("../../models/index");

const shopItems = [
  {
    name: "Grey coat with pink long sleeves",
    description: "Grey coat with pink long sleeves",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/women-s-gray-coat-with-pink-long-sleeved-shirt-seats-on-794063.jpg",
    price: 6798,
  },
  {
    name: "Yellow long sleeved dress",
    description: "Yellow long sleeved dress",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/women-s-yellow-long-sleeved-dress-1055691.jpg",
    price: 5680,
  },
  {
    name: "Black long sleeved shirt",
    description: "Black long sleeved shirt",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/women-s-black-long-sleeved-shirt-with-white-polka-dots-1021693.jpg",
    price: 4590,
  },
  {
    name: "Pink lace-up shoes",
    description: "Pink lace-up shoes",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/woman-sitting-on-sofa-bed-wearing-sunglasses-965324.jpg",
    price: 8790,
  },
  {
    name: "Black round sunglasses",
    description: "Black round sunglasses",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/woman-wearing-white-and-black-shirt-1388888.jpg",
    price: 2340,
  },
  {
    name: "Red checkered dress",
    description: "Red checkered dress",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/wenyang-5pPxsuAbYVY-unsplash.jpg",
    price: 5540,
  },
  {
    name: "Black short jacket",
    description: "Black short jacket",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/woman-wearing-black-jacket-3341810.jpg",
    price: 12900,
  },
  {
    name: "Pink loose-fit top",
    description: "Pink loose-fit top",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/standing-woman-wearing-orange-button-collared-top-near-red-1852382.jpg",
    price: 5560,
  },
  {
    name: "Brown cat-eye sunglasses",
    description: "Brown cat-eye sunglasses",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/woman-in-vehicle-2703454.jpg",
    price: 3400,
  },
  {
    name: "Men’s short sleeve brown shirt",
    description: "Men’s short sleeve brown shirt",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/miguel-dominguez-OxPuMO3zQ9s-unsplash.jpg",
    price: 3340,
  },
  {
    name: "Pink top",
    description: "Pink top",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/julian-myles-3vDYpI2lMPA-unsplash.jpg",
    price: 4450,
  },
  {
    name: "Long white pants",
    description: "Long white pants",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/photo-of-woman-standing-on-pavement-3289500.jpg",
    price: 5560,
  },
  {
    name: "Long white dress",
    description: "Long white dress",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274455/clothalia/photography-of-a-woman-holding-green-leaves-1071162.jpg",
    price: 8870,
  },
  {
    name: "Pink hat",
    description: "Pink hat",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/johan-de-jager-MpsL20xXDJk-unsplash.jpg",
    price: 2230,
  },
  {
    name: "Black long dress",
    description: "Black long dress",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/ospan-ali-nyrSsBzhZ4Y-unsplash.jpg",
    price: 9980,
  },
  {
    name: "Oversize headphones",
    description: "Oversize headphones",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/julian-myles-4ju4U9e9Y68-unsplash.jpg",
    price: 4560,
  },
  {
    name: "Black long modern women’s dress",
    description: "Black long modern women’s dress",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/justin-essah-UeRbO61FMGo-unsplash.jpg",
    price: 12399,
  },
  {
    name: "Short sleeve orange shirt",
    description: "Short sleeve orange shirt",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/houcine-ncib-6hUa_5hiDxw-unsplash.jpg",
    price: 4450,
  },
  {
    name: "Brown long coat",
    description: "Brown long coat",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274453/clothalia/angelika-agibalova-Zx752GJaytw-unsplash.jpg",
    price: 22400,
  },
  {
    name: "Long striped pants",
    description: "Long striped pants",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274454/clothalia/fashion-pexels-2703401.jpg",
    price: 5590,
  },
  {
    name: "White oversized hoodie",
    description: "White oversized hoodie",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274453/clothalia/daniel-adesina-swUiA_akPWs-unsplash.jpg",
    price: 6590,
  },
  {
    name: "Black summer dress",
    description: "Black summer dress",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274453/clothalia/beauty-collar-dress-elegant-1454180.jpg",
    price: 6790,
  },
  {
    name: "White summer top",
    description: "White summer top",
    image:
      "https://res.cloudinary.com/dl-projects/image/upload/v1577274453/clothalia/analise-benevides-gbx-Gnl-48I-unsplash.jpg",
    price: 3490,
  },
];

async function seed() {
  await db.ShopItem.insertMany(shopItems);
}

module.exports = seed;
