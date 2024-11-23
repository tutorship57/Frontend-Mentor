const dataList = document.getElementById('data-list')
console.log("hello");
downloadData()
async function downloadData() {
    try {
        const response = await fetch('data.json')
        const data = await response.json()
        console.log("fetch success *-*");
        console.log(data);
        data.forEach(item => {
            const listItem = document.createElement('li')
            listItem.textContent = `image: ${item.image.desktop}, Name: ${item.name}, Prize: ${item.price}` 
            dataList.appendChild(listItem);
            console.log(item);
         });
        return data 
    } catch (error) {   
        console.log("this is error : "+error );
    }
}



