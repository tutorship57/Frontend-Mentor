const dataList = document.getElementById('data-list')
console.log("hello");
downloadData()
async function downloadData() {
    try {
        const response = await fetch('data.json')
        const data = await response.json()
        console.log("fetch success *-*");
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const DivTag = document.createElement('div');
            let priceCasting = parseFloat(element.price).toFixed(2);
    
            
            DivTag.classList.add('menu');
            DivTag.setAttribute('name',index);
            DivTag.innerHTML = `<div class="pictureAndCart">
            <img src="${element.image.desktop}" alt="">
            <div class="add-tocart"><img class="icon" src="./assets/images/icon-add-to-cart.svg"> Add to Cart</div>
            <div class="have-Incart" id="a">
              <div class="iconIncart decreaseIcon"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2"
                  fill="none" viewBox="0 0 10 2">
                  <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                </svg></div>
              <div class="quantity"></div>
              <div class="iconIncart increaseIcon"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  fill="none" viewBox="0 0 10 10">
                  <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                </svg></div>
            </div>
          </div>
          <div class="category">${element.category}</div>
          <div class="menuName">${element.name}</div>
          <div class="price">$${priceCasting}</div>
            `
            const menuShowmenu = document.querySelector('.menu-showMenu')
            menuShowmenu.appendChild(DivTag);
        }
        return data 
    } catch (error) {   
        console.log("this is error : "+error );
    }
}



