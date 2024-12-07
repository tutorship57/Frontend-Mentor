console.log("yesk");
import { quantityCart, count , totalPrice, decreaseCount, decreaseTotalPrice,increaseCount, increaseTotalPrice } from "./index.js";
console.log(quantityCart);

const menuCartList = document.querySelectorAll('.menu');

for (let i = 1; i < menuCartList.length; i++) {
    const menu = menuCartList[i];
    menu.querySelector('.decreaseIcon').addEventListener('click',(event)=>decreaseQuantity(event.target));
    menu.querySelector('.increaseIcon').addEventListener('click',(event)=>increaseQuantity(event.target));
}
function decreaseQuantity(button) {
    
    const menuItem  = button.closest('.menu');
    const index = menuItem.getAttribute('name');

    const detailmenuAll = Array.from(document.querySelectorAll('.detailCart'));
    console.log(detailmenuAll);
    
    const menuSelected = detailmenuAll.find(menu => {
        console.log(menu);
        const Each = menu.querySelector('.detailMenu');
        console.log(Each);
        
        // let hello = menu.querySelector('detailMenu').getAttribute('name')
        // console.log(typeof hello);
        console.log(typeof index);
        console.log(menu.querySelector('.detailMenu').getAttribute('name'));
        console.log(index);
        return menu.querySelector('.detailMenu').getAttribute('name') === index ;
    })
    const priceEachString= menuSelected.querySelector('.perEach').textContent;
    const priceEach = parseFloat(priceEachString.substring(1)).toFixed(2);
    console.log(priceEach);
    console.log(menuSelected);
    
    
    quantityCart[parseInt(index)] -= 1;
    const addToCartButton = menuItem.querySelector('.add-tocart');
    const haveIncartDiv = menuItem.querySelector('.have-Incart');
    haveIncartDiv.querySelector('.quantity').textContent = quantityCart[parseInt(index)];

    //manage in cart 
    const cartContainerAll = Array.from(document.querySelectorAll('.cartContainer'));
    const selectContainer=cartContainerAll.find(cartContainer => {
        return cartContainer.querySelector('.detailMenu').getAttribute('name') === index ;
    })
    const amountLabel = selectContainer.querySelector('.amount');
    const totalAmountLabel = selectContainer.querySelector('.totalAmount');
    amountLabel.textContent = `${quantityCart[parseInt(index)]}x`;
    totalAmountLabel.textContent = `$${(quantityCart[parseInt(index)] * parseFloat(priceEach)).toFixed(2)}`;

    //

    if(quantityCart[parseInt(index)] == 0){
        menuSelected.closest('.cartContainer').remove();
        menuSelected.remove();
        addToCartButton.style.display = 'flex';
        haveIncartDiv.style.display = 'none';
    }
    decreaseCount();
    decreaseTotalPrice(priceEach);
    const cartHead = document.querySelector('.cartHead');
    cartHead.textContent = `Your Cart (${count})`;  
    const cardEmpty = document.querySelector('.cardEmpty');
    const SumOrder = document.querySelector('.SumOrder');
    SumOrder.textContent = `$${totalPrice.toFixed(2)}`;
    if(count == 0){
        cardEmpty.style.display = 'flex';
        cardEmpty.classList.add('Active');
        const cartSummation = document.querySelector('.cartSummation');
        cartSummation.style.display = 'none';
    }
    console.log(quantityCart);
    
}   

function increaseQuantity(button) {
    const menuItem  = button.closest('.menu');
    const index = menuItem.getAttribute('name');

    // update the quantity in the quantityCart array
    quantityCart[parseInt(index)] += 1;

    // manage in the buttonLabel ;
    const quantity = menuItem.querySelector('.quantity');
    quantity.textContent = quantityCart[parseInt(index)];
    
    // manage in the cart
    const cartContainerAll = Array.from(document.querySelectorAll('.cartContainer'));
    const selectContainer=cartContainerAll.find(cartContainer => {
        return cartContainer.querySelector('.detailMenu').getAttribute('name') === index ;
    })
    const amountLabel = selectContainer.querySelector('.amount');
    const totalAmountLabel = selectContainer.querySelector('.totalAmount');
    const perEachPriceLabel = selectContainer.querySelector('.perEach');
    const priceEach = parseFloat(perEachPriceLabel.textContent.substring(1));
    amountLabel.textContent = `${quantityCart[parseInt(index)]}x`;
    
    totalAmountLabel.textContent = `$${(quantityCart[parseInt(index)] * priceEach).toFixed(2)}`;
    console.log("ehere");
    
    // update the quantity value CartCount 
    increaseCount();

    //update CartHead 
    const cartHead = document.querySelector('.cartHead');
    cartHead.textContent = `Your Cart (${count})`;  
    
    // update totalPrize
    increaseTotalPrice(priceEach);

    //update SumOrder
    const SumOrder = document.querySelector('.SumOrder');
    SumOrder.textContent = `$${totalPrice.toFixed(2)}`;
}







