const sliderTrack = document.querySelector(".slider-track");
const buttonLeft = document.querySelector(".slider-button.left");
const buttonRight = document.querySelector(".slider-button.right");
const operationTabContainer = document.querySelector(".operations__tab-container");
const operation = document.querySelector(".operations");


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

    renderTabbedComponent(products);

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

/* TABBED COMPONENTS */

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll('.operations__tab');/* 
const tabsContent = document.querySelectorAll('.operations__content'); */

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  const allContents = document.querySelectorAll(".operations__content");


  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  allContents.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const renderTabbedComponent = (products) => {
    const firstThreeProduct = products.slice(0, 3);

    firstThreeProduct.forEach((product, i) => {

        const tabIndex = i + 1;
        const isActive = i === 0 ? 'operations__content--active' : '';

        const html = `
        <div class="operations__content operations__content--${tabIndex} ${isActive}">
          
             <div class="product-info">
                    <div class="product-category">${product.category.name}</div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-price">$${product.price}</div>
         </div>
            <div class="tabbed-img-wrapper">
          <img src="product${product.id}image1.jpeg" class="img-1" alt="Product image 1">
          <img src="product${product.id}image2.jpeg" class="img-2" alt="Product image 2">
        </div>
         

          <div class="product-description">
          <p >${product.description}</p>
          </div>
        </div>`;

        operation.insertAdjacentHTML("beforeend", html);

    });

}
