let visible;
let eventData;
let len = 0;
let stackArea = document.querySelector('.screen')
const bgEl = document.querySelector('.bg')

fetch('data.json')
    .then(res=> res.json())
    .then(data => fetchedData(data))
    .catch(e => console.error(e))


const fetchedData = (data) => {
    eventData = data
    for( let ev in data){
        createCard(data[ev], ev)
        len++

    }
    stackArea.style.height = 20 * (stackArea.getBoundingClientRect().height / 2) +200+ "px"
    rotateCards()
}

function createCard(data, ind){
    
    const card = document.createElement('div')
    card.className = "card"
    card.classList.add(`card-${ind}`)
    card.style.background = data.bgColor
    card.style.color = textClr(data.bgColor)  
    if(ind == 0){
        card.classList.add("welcome-card")
        const heading = document.createElement('h1');
        heading.textContent = 'Welcome to June Celebrations!';
        const icon = document.createElement('div');
        icon.textContent = '🎉'; 
        const description = document.createElement('p');
        description.textContent = 'Explore meaningful international days in June — from the environment to equality, one scroll at a time.';
        const credit = document.createElement('p');
        const link = document.createElement('a');
        link.href = 'https://rith1x.github.io'; 
        link.textContent = 'Kiruthik Kumar';
        link.target = '_blank'; 
        credit.textContent = 'Built with purpose by ';
        credit.appendChild(link);
        credit.innerHTML+= "<br><br>Scroll to continue"
        card.appendChild(heading);
        card.appendChild(icon);
        card.appendChild(description);
        card.appendChild(credit);


    }else if(ind == 18){
        card.classList.add("thanks-card")
        const heading = document.createElement('h1');
        heading.textContent = 'Thank You!';
        const icon = document.createElement('div');
        icon.textContent = '🙏'; 
        icon.className = 'emoji'
        const description = document.createElement('p');
        description.textContent = 'I appreciate your support and time.';
        const credit = document.createElement('p');
        const link = document.createElement('a');
        link.href = 'https://rith1x.github.io'; // replace with your actual URL
        link.textContent = 'Kiruthik Kumar';
        link.style.color = data.bgColor
        link.style.background = textClr(data.bgColor)
        link.target = '_blank'; // open in new tab
        
        credit.textContent = 'Made with ❤️ by ';
        credit.appendChild(link);
        const views = document.createElement('img')
        views.src = `https://vbr.nathanchung.dev/badge?page_id=JuneDevToChallenge&color=000000&label=CNT&lcolor=000000&style=for-the-badge`
        card.append(heading,icon,description,credit,views)
    }else{
        
        const dayTitle = document.createElement('h2')
        dayTitle.innerText = data.day
        const dateBox = document.createElement('h3')
        // dateBox.innerText = data.date.split(" ")[1].padStart(2,'0')
        dateBox.innerText = data.date
        dateBox.className = "date"
        const slogaX = document.createElement('h1')
        slogaX.innerText = data.slogan
    
        const emoji = document.createElement('p')
        emoji.innerText = data.emoji
        emoji.className = 'emoji'
    
        const desc = document.createElement('p')
        desc.innerText = data.description
    
        const tags = document.createElement('div')
        tags.className = "tags"
        data.tags.forEach(tag => {
            const tagE = document.createElement('span')
            tagE.innerText = tag
            tags.appendChild(tagE)
        })
    
        const res = document.createElement('a')
        res.href = data.resourceLink
        res.innerText =data.resourceLink.split('/')[2]
 + " ◥"
         res.style.color = data.bgColor
        res.style.background = textClr(data.bgColor)
        card.append(tags,dateBox, emoji,dayTitle, slogaX,desc,res)
    }
    
    

    document.getElementById('content').appendChild(card)
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms))
let buffer;
function rotateCards(){
    const cards = document.querySelectorAll('.card')
    let angle = 0
    let opacity = 1
    cards.forEach((card,index)=>{
        if(card.classList.contains("away")){
            card.style.transform = `translatey(-300dvh) translatex(300dvh) rotate(45deg)`
            card.style.opacity = 0
        }else{
            card.style.opacity = opacity
            card.style.transform = `rotate(${angle}deg)`
            card.style.zIndex = cards.length - index
            angle -=3
            opacity -= 0.15
        }
    })
    if(buffer != visible){
        buffer = visible
        // document.querySelector('.bg').style.background = textClr(eventData[buffer+1].bgColor)
        bgEl.style.backgroundImage = `url(${generateEmojiImage(eventData[buffer+1].emoji, 20, bgEl.getBoundingClientRect().height, bgEl.getBoundingClientRect().width ,textClr(eventData[buffer+1].bgColor),eventData[buffer+1].bgColor)})`

    }

    
}

window.addEventListener("scroll",()=>{
    let dist = window.innerHeight / 2
    let topVal = stackArea.getBoundingClientRect().top 
    let currInd = -1 * (topVal / dist + 1) 
    let ind = Math.floor(currInd);
    visible = ind
    for(let i = 0; i < len; i++){
        if(i <= ind){
            document.querySelector(`.card-${i}`).classList.add("away")
        }else{
            document.querySelector(`.card-${i}`).classList.remove("away")

        }
    }

    rotateCards();
})

function textClr(lightHex) {
    const hex = lightHex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const darkR = Math.max(0, r - 160);
    const darkG = Math.max(0, g - 160);
    const darkB = Math.max(0, b - 160);
    const darkHex = "#" + darkR.toString(16).padStart(2, '0') +
        darkG.toString(16).padStart(2, '0') +
        darkB.toString(16).padStart(2, '0');

    return darkHex;
}
  
  

function generateEmojiImage(emoji = '🧘', count = 100, width = 512, height = 512, bgColor = '#ffffff') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const baseSize = 48;
  
    canvas.width = width;
    canvas.height = height;
  
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = textClr(bgColor);
    ctx.font = `${baseSize}px 'Noto Color Emoji', serif`;
  
    for (let i = 0; i < count; i++) {
      const scale = 0.8 + Math.random() * 0.6;  
      const angle = (Math.random() - 0.5) * (Math.PI / 6); 
      const x = Math.random() * width;
      const y = Math.random() * height;
  
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.fillText(emoji, 0, 0);
      ctx.restore();
    }
  
    return canvas.toDataURL(); 
  }