// ===== Funcoes auxiliares ou uteis

const insertData = (productItem, product) => {
  productItem.querySelector(".product-item-img").src = product.img;
  productItem.querySelector(".product-item-name").innerHTML = product.name;
  productItem.querySelector(".product-item-price").innerHTML = `R$ ${product.price.toFixed(2).replace(".", ",")}`;
  productItem.querySelector(".product-item-prevPrice").innerHTML = `R$ ${product.prevPrice.toFixed(2).replace(".", ",")}`;
}

const closeModal = () => {
  document.querySelector(".background-cart-item").style.display = "none";
  document.querySelector(".cart-item").style.display = "none";
}

const openModal = () => {
  document.querySelector(".background-cart-item").style.display = "block";
  document.querySelector(".cart-item").style.display = "flex";
}


// ===== Insercao dos produtos nos respectivos campos

// Primeira lista de produtos
itemList.map((product) => {
  let productItem = document.querySelector(".models .product-item").cloneNode(true);
  document.querySelector(".first-products-area").append(productItem);
  insertData(productItem, product);

})

// Segunda lista de produtos
itemList.map((product) => {
  let productItem = document.querySelector(".models .product-item").cloneNode(true);
  document.querySelector(".second-products-area").append(productItem);
  insertData(productItem, product);
})

// Terceira lista de produtos
itemList.map((product) => {
  let productItem = document.querySelector(".models .product-item").cloneNode(true);
  document.querySelector(".third-products-area").append(productItem);
  insertData(productItem, product);
})
itemList.map((product) => {
  let productItem = document.querySelector(".models .product-item").cloneNode(true);
  document.querySelector(".third-products-area").append(productItem);
  insertData(productItem, product);
})

// Quarta lista de produtos
itemList.map((product) => {
  let productItem = document.querySelector(".models .product-item").cloneNode(true);
  document.querySelector(".fourth-products-area").append(productItem);
  insertData(productItem, product);
})
itemList.map((product) => {
  let productItem = document.querySelector(".models .product-item").cloneNode(true);
  document.querySelector(".fourth-products-area").append(productItem);
  insertData(productItem, product);
})

// ===== Interacoes com carrinho de compra

// Fechar carrinho ao clicar no "X"
let closeIconBtn = document.querySelector(".close-modal");
closeIconBtn.addEventListener("click", () => {
  closeModal();
});

// Fechar carrinho ao clicar em "continuar comprando"
let closeContinueBtn = document.querySelector(".cart-btn-continue");
closeContinueBtn.addEventListener("click", () => {
  closeModal();
});

// Finalizar compra ao clicar em "finalizar compra"
let finishBtn = document.querySelector(".cart-btn-finish");
let productContainer = document.querySelector(".cart-body");

finishBtn.addEventListener("click", () => {
  document.querySelector(".purchase-items").style.display = "block";
  closeModal();
  localStorage.clear("email", "productsInCart", "totalCost", "cartNumbers");
  setTimeout(() => { window.location.reload() }, 2500);
});

// Abrir carrinho ao clicar no ícone no Header
let cartIcon = document.querySelector(".cartIcon");
cartIcon.addEventListener("click", () => {
  displayCart();
  openModal();
});

// Abrir carrinho ao clicar em "comprar" e adicionar os respectivos produtos
let actionBtn = document.querySelectorAll(".buy-btn");

for (let i = 0; i <= actionBtn.length; i++) {
  actionBtn[i]?.addEventListener('click', () => {
    if ([i] % 2 === 0) {
      cartNumbers(itemList[1]);
      totalCost(itemList[1]);
      displayCart();
    } else {
      cartNumbers(itemList[0]);
      totalCost(itemList[0]);
      displayCart();
    }
    openModal();
  });
};

// Funcao para carregar o numero de itens no carrinho do Header
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".nav-icons span").textContent = productNumbers;
  }
}

// Funcao para possibilitar a contagem de itens no carrinho
function cartNumbers(itemLists) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".nav-icons span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".nav-icons span").textContent = 1;
  }
  setItems(itemLists)
}

function setItems(itemLists) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[itemLists.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [itemLists.tag]: itemLists
      }
    }
    cartItems[itemLists.tag].inCart += 1;
  } else {
    itemLists.inCart = 1;

    cartItems = {
      [itemLists.tag]: itemLists
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

// Funcao para calcular custo total
function totalCost(itemLists) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    cartCost = cartCost;
    localStorage.setItem("totalCost", cartCost + itemLists.price);
  } else {
    localStorage.setItem("totalCost", itemLists.price);
  }
}

// Funcao para exibir produtos e custo total no carrinho
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-body");

  let cartCost = localStorage.getItem("totalCost");
  let cartCosts = parseFloat(cartCost).toFixed(2).replace(".", ",");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
                    <img class="product-item-img" src="${item.img}">
                    <aside>
                        <p class="product-item-name">${item.name}</p>
                        <div class="color-size">
                            <p class="product-item-color">Cor: ${item.color}</p>
                            <p class="product-item-size">Tamanho: ${item.size}</p>
                        </div>
                        <p class="product-item-price">R$ ${item.price.toFixed(2).replace(".", ",")} <h5 class="item-qnt">Quantidade: ${item.inCart}</h5></p>
                    </aside>`
    });
    let productContainerFooter = document.querySelector(".cart-total");
    productContainerFooter.innerHTML = ` R$ <span>${cartCosts}</span>`
  }
}

onLoadCartNumbers();