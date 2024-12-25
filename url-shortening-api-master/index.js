console.log("hello ")
const linkButton = document.querySelector('.linkButton')
linkButton.addEventListener('click',()=>ShortenLinkButtonClick(this))
async function ShortenLinkButtonClick(button){
    const typeBox = document.querySelector('.typeBox');
    const content = typeBox.value;
    console.log(content);
    try {
        const url = `https://api.shrtco.de/v2/shorten?url=${content}` 
        console.log(url);
        const response = await fetch(url,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        const data = await response.json()
        console.log(data.url);
        const shortenLinkList = document.querySelector('.shortenLinkList');
        const shortenItem = document.createElement('div')
        shortenItem.classList.add('shortenItem')
        shortenItem.innerHTML = `
            <div class="shortenWrapper">
            <div class="shortenName">${content}</div>
            <div class="shortenZone">
                <a class="shortenLinkUrl">${data.url}</a>
                <div class="copyButton">copy</div>
            </div>
            </div>`
        shortenLinkList.appendChild(shortenItem)
    } catch (error) {
        console.log('there is no Url you provided ',error.message)
    }
    

}

