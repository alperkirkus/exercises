const sliderTrack = document.querySelector(".slider-track");
const buttonLeft = document.querySelector(".slider-button.left");
const buttonRight = document.querySelector(".slider-button.right");

let currentIndex = 0;
const visibleCount = 4;
let totalProducts = 0;
let productWidth = 0;

const getProducts = async () => {
   try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=7");
    const products = await response.json();

    totalProducts = products.length;
    sliderTrack.innerHTML = "";

     console.log(products);

    if(!response) throw new Error("No response");

     products.forEach(product => {
    
        const html = `
        <div class="product-card">
        <div class="img-wrapper">
          <img src="product${product.id}image1.jpeg" class="img-main" alt="${product.title}">
          <img src="product${product.id}image2.jpeg" class="img-hover" alt="${product.title}">
        </div>
        <div class="product-info">
          <div class="product-category">${product.category.name}</div>
          <div class="product-title">${product.title}</div>
          <div class="product-price">$${product.price}</div>
        </div>
      </div>
    `
        sliderTrack.insertAdjacentHTML("beforeend", html);
    }); 

    const productCard = document.querySelector(".product-card");
    productWidth = productCard.offsetWidth;

   } catch (error) {
    console.error(error);
   }  
};

function updateSlider()
{
    const offset = -(currentIndex * productWidth);
    sliderTrack.style.transform = `translateX(${offset}px)`;
    sliderTrack.style.transition = "transform 0.5s ease-in-out";
}
buttonRight.addEventListener("click", () => {
        currentIndex++;
        if(currentIndex > totalProducts - visibleCount){
            currentIndex = 0;
        }
        updateSlider();
});

buttonLeft.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalProducts - visibleCount;
  }
  updateSlider();
});

getProducts();