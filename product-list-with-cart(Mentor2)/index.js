const addtocart = document.querySelector(".add-tocart");
const haveIncart = document.querySelector(".have-Incart");
const quantity = document.querySelector(".quantity");
export let quantityCart = [0,0,0,0,0,0,0,0,0];
export let count = 0;
export let totalPrice = 0;
export function decreaseCount(){
  count -= 1;
}
export function decreaseTotalPrice(amount){
  totalPrice = totalPrice - amount;
}
function decreaseCountSelected(number){
  count -= number
}
export function increaseCount(){
  count +=1
}
export function increaseTotalPrice(amount){
  totalPrice = totalPrice + amount;
}
document.querySelectorAll('.add-tocart').forEach(button => {
  button.addEventListener('click', (event) => AddTocart(event.target));
});
document.querySelector('.confirmOrder').addEventListener('click', (event) => getCartMenuConfirm(event.target));
document.querySelector('.SubmitOrder').addEventListener('click', (event) => SubmitOrderClose(event.target));
// function AddTocart(clickedElement) {
//     clickedElement.addtocart.style.display = 'none';
//     clickedElement.haveIncart.style.display = "flex";
//     console.log("clicked");
// }
function AddTocart(button) {
    // Find the closest menu container (e.g., Waffle-label, CremeBrulee-label, etc.)
    const menuItem = button.closest('.menu');
    console.log(menuItem);
    // Check if the menuItem already has the active class
    // if (menuItem.classList.contains('active')) {
    //   return; // If it does, do nothing (already added to cart)
    // }
    const index = menuItem.getAttribute('name');
    // console.log(index); 
    const category = menuItem.querySelector('.category').textContent;
    // Hide the "Add to Cart" button and show the "have-Incart" div for this menu item
    // chanege button 
    const addToCartButton = menuItem.querySelector('.add-tocart');
    const haveIncartDiv = menuItem.querySelector('.have-Incart');
    const quantity = menuItem.querySelector('.quantity');
    menuItem.classList.add('active');
    addToCartButton.style.display = 'none';
    haveIncartDiv.style.display = 'flex';
    haveIncartDiv.setAttribute('name', menuItem.getAttribute('name'));
    quantity.textContent = 1;
    console.log("inner Select Quantity");
    // selectQuantityButton(menuItem);    

    // Increment the quantity of the menu item
    quantityCart[parseInt(index)] += 1;
    count +=1 ;
    
    const menuName = menuItem.querySelector('.menuName').textContent;
    const price = menuItem.querySelector('.price').textContent;
    const cartHead = document.querySelector('.cartHead');
    cartHead.textContent = `Your Cart (${count})`; 
    // Add the menu details to the cart
    const cartItem = document.createElement('div');
    cartItem.classList.add('detailCart');
    const calculateTotalPerMenu = (parseFloat(price.substring(1,4))*quantityCart[parseInt(index)]).toFixed(2);
    
    totalPrice = totalPrice + parseFloat(calculateTotalPerMenu);
    cartItem.innerHTML = `
    <div class="detailMenu" name="${index}" category="${category}">
        <div class="menuName nameOrderCart">${menuName}</div>
        <div class="menuStandard">
          <div class="price amount">${quantityCart[parseInt(index)]}x</div>
          <div class="priceAmount">
              <div class="category perEach">${price}</div>
              <div class="totalAmount">$${calculateTotalPerMenu}</div>
          </div>
        </div>
    </div>
    <div class="removeIcon"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></div>
    `;
    cartItem.querySelector('.removeIcon').addEventListener('click', (event) => removeSelectedOrder(event.target));
    const cartPickUpList = document.querySelector('.cartPickUpList');
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cartContainer');
    const lineUnderTheEndOrder = document.createElement('hr');
    lineUnderTheEndOrder.classList.add('line');
    cartContainer.appendChild(cartItem);

    cartContainer.appendChild(lineUnderTheEndOrder);
    cartPickUpList.appendChild(cartContainer);
    // check the quantity

    // not display some cart Context 
    const cardEmpty = document.querySelector('.cardEmpty');
    console.log("cardEmpty contains Active :"+ cardEmpty.classList.contains('Active'));
    
    if(cardEmpty.classList.contains('Active')){
        cardEmpty.style.display = "none";
        cardEmpty.classList.remove('Active');
        console.log("remove");
        
    }

    
 
    

    //CartSummation Display
    const cartSummation = document.querySelector('.cartSummation');
    cartSummation.style.display = "flex";
    //TotalOrder Display 
    const totalOrder = document.querySelector('.SumOrder');  
    totalOrder.textContent = `$${totalPrice.toFixed(2)}`;

    console.log(quantityCart);
    console.log("end");

    //
}

function removeSelectedOrder(button){
    //cartSelected 
    const cartSelected = button.closest('.cartContainer');
    const index = cartSelected.querySelector('.detailMenu').getAttribute('name');
    const indexIntCast = parseInt(index);
    const AmountSelected = cartSelected.querySelector('.amount').textContent;
    const AmountCutX = AmountSelected.substring(0,AmountSelected.length-1);
    const AmountIntCast = parseInt(AmountCutX);
    const totalPrize = cartSelected.querySelector('.totalAmount').textContent.substring(1);
    const totalPrizeFloatCast = parseFloat(totalPrize);
    // decrease the quantity in array 
    console.log(AmountIntCast);
    console.log(quantityCart[indexIntCast]);
    
    quantityCart[indexIntCast] -= AmountIntCast;

    //decreaseCountIncart 
    decreaseCountSelected(AmountIntCast);

    // decrease the total price 
    decreaseTotalPrice(totalPrizeFloatCast);
    
    //ControllerSameMenuButtonChange 
    const ShowmenuBoundary = document.querySelector('.menu-showMenu');
    const MenuAll = Array.from(ShowmenuBoundary.querySelectorAll('.menu'));
    const menuSelected = MenuAll.find(menu => menu.getAttribute('name') === index);
    const haveIncartDiv = menuSelected.querySelector('.have-Incart');
    haveIncartDiv.querySelector('.quantity').textContent = quantityCart[indexIntCast];
    haveIncartDiv.style.display = 'none';
    const addToCartButton = menuSelected.querySelector('.add-tocart');
    addToCartButton.style.display = 'flex';
    //Remove cart 
    cartSelected.remove();
    //Updated CartHead
    const cartHead = document.querySelector('.cartHead');
    cartHead.textContent = `Your Cart (${count})`;
    //Updated SumOrder
    const totalOrder = document.querySelector('.SumOrder');  
    totalOrder.textContent = `$${totalPrice.toFixed(2)}`;
    //check the quantity
    if(count ==0){
      //ShowCartEmpty
      const CartEmpty = document.querySelector('.cardEmpty');
      CartEmpty.classList.add('Active');
      CartEmpty.style.display = "flex";
      //CartSummation Display
      const cartSummation = document.querySelector('.cartSummation');
      cartSummation.style.display = "none";
    }
}

function getCartMenuConfirm(button){
  const cartSelected = button.closest('.cart');
  const cartPickUpList = cartSelected.querySelector('.cartPickUpList');
  const AllElementMenuContainer = Array.from(cartPickUpList.querySelectorAll('.cartContainer'));
  const menuWrapper = document.querySelector('.menuWrapper');
  for (let i = 0; i < AllElementMenuContainer.length; i++) {
    // loop each element and add to SubmitCard
    const element = AllElementMenuContainer[i];
    const detailMenu = element.querySelector('.detailMenu');
    const index = detailMenu.getAttribute('name');
    let category = detailMenu.getAttribute('category') ;
    if(category === "Crème Brûlée"){
      category = "creme-brulee";
    }
    if(category === "Pie"){
      category = "Meringue";
    }
    const categoryReplaceSpace = category.replace(" ", "-");
    const detailMenuName = element.querySelector('.menuName').textContent;
    const detailMenuQuantity = element.querySelector('.amount').textContent;
    const detailMenuPriceTotalAmount = element.querySelector('.totalAmount').textContent;
    const perEachPrice = element.querySelector('.perEach').textContent;

    //Access to SubmitOrder
    
    const OrderContainer = document.createElement('div');
    OrderContainer.classList.add('OrderContainer');
    const MenuSelectedOrder = document.createElement('div');
    MenuSelectedOrder.classList.add('MenuSelectedOrder');
    MenuSelectedOrder.innerHTML = `
              <div class="OrderFront" name="${index}">
                <img src="./assets/images/image-${categoryReplaceSpace}-thumbnail.jpg" alt="" class="OrderImageThumbNail">
                <div class="OverallDetailOrder">
                  <div class="menuName">${detailMenuName}</div>
                  <div class="OverallPrizeOrder">
                    <div class="price amount">${detailMenuQuantity}</div>
                    <div class="category perEach">${perEachPrice}</div>
                  </div>
                </div>
              </div>
              <div class="OrderBack">
                <div class="TotalPrizeOrder">${detailMenuPriceTotalAmount}</div>
              </div>`
    OrderContainer.appendChild(MenuSelectedOrder);
    //add a line between each element
    const lineBreak = document.createElement('hr');
    lineBreak.classList.add('line');
    OrderContainer.appendChild(lineBreak);
    //add to menuWrapper
    menuWrapper.appendChild(OrderContainer);


  }
  //Create the OrderTotalLabel
  const OrderTotalLabel = document.createElement('div');
  const SumOrder = document.querySelector('.SumOrder').textContent;
  OrderTotalLabel.classList.add('OrderTotalLabel');
  OrderTotalLabel.innerHTML = `
  <div class="orderTotal">Order Total</div>
          <h1 class="SumOrder">${SumOrder}</h1>`
  menuWrapper.appendChild(OrderTotalLabel);

  //access to SubmitOrderContainer
  const SubmitOrderContainer = document.querySelector('.SubmitOrderContainer');
  SubmitOrderContainer.style.display = 'flex';

}
function SubmitOrderClose(button){
  const SubmitOrderContainer = button.closest('.SubmitOrderContainer');
  const menuWrapper = SubmitOrderContainer.querySelector('.menuWrapper');
  const AllListOrder = Array.from(menuWrapper.querySelectorAll('.OrderContainer'));
  for (let i = 0; i < AllListOrder.length; i++) { 
    const element = AllListOrder[i];
    element.remove();
  }
  const OrderTotalLabel = document.querySelector('.OrderTotalLabel');
  OrderTotalLabel.remove()
  SubmitOrderContainer.style.display = 'none';
}
// function 


// function selectQuantityButton(menuItem) {
//   const addToCartButton = menuItem.querySelector('.add-tocart');
//   const haveIncartDiv = menuItem.querySelector('.have-Incart');
//   const quantity = menuItem.querySelector('.quantity');
//   menuItem.classList.add('active');
//   addToCartButton.style.display = 'none';
//   haveIncartDiv.style.display = 'flex';
//   haveIncartDiv.setAttribute('name', menuItem.getAttribute('name'));
//   quantity.textContent = 1;
//   console.log("inner Select Quantity");
// }

// window.AddTocart = AddTocart; // อย่าหาใช้ not best practice 
// The error occurs because AddTocart(this) is being 
// called in the global scope (onclick in HTML), but 
// your AddTocart function is part of a module and 
// is not accessible in the global scope. When using type="module",
// functions and variables defined in your script are 
// not automatically added to the global window object.

// the smarter ways to approach html file 
// document.querySelector('.add-tocart').addEventListener('click', (event) => {
//   AddTocart(event.target);
// });
