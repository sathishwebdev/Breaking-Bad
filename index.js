Element.prototype.set = function(props){
    let keys =  Object.keys(props)
    // set Attributes
    keys.forEach(key=>{
        this.setAttribute(key, props[key])
    })
}



class Character{
    


    showDetails({char_id,name, img, portrayed,occupation, nickname, status}, dCount){
        let root = document.getElementById('root')
        const create = (val) => document.createElement(val)
        let imgCon = create('div')
        let card = create('div')
        card.set({class:"card"})
        let cardBody = create('div')
        cardBody.set({class:"card-body"})
        let cardTitle = create('div')
        cardTitle.set({class:"card-title"})
        let cardImg = create('div')
        cardImg.set({class:"card-image"})
        let imgEle = create('img')
        let content = create('div')
        content.set({style:"display: none;", id: char_id})
        content.innerHTML=`
        <p style="font-size: small">Also known as : ${nickname}</p>
        <p style="font-size: small">Death Count : ${dCount} </p>
        <p style="font-size: small;">Status : <span style="color: ${status === 'Alive'? 'green' : status === 'Deceased' ? 'red' : 'orange'}">  ${status}</span></p>
        
        <p style="font-size: small">Occupation : ${occupation}</p>`
        imgEle.set({
            src: img,
            alt: name,
            title: name
        })
        imgCon.set({
            class: 'img-container'
        })
        let p = create('p')
        p.innerHTML = `${name} <p style="font-size: small; color: grey;"> as ${portrayed}</p>`
        let showBtnCon = create('div')
    showBtnCon.set({class:"content-show-btn"})
        let button = create('button')
        button.set({class:"btn btn-transparent iconBtn ", onclick:`showContent(${char_id})`, id:`btn-${char_id}`})
        button.innerHTML = `<i class="fa fa-chevron-down"></i>` 
        showBtnCon.append(button)
        cardImg.append(imgEle)
        cardTitle.append(p)
        cardBody.append(content, showBtnCon)
        card.append(cardImg, cardTitle, cardBody)
        root.append(card)
    }
}

async function getData (){
    // all data

    let character = new Character()
   let fetchCharcters = await fetch('https://www.breakingbadapi.com/api/characters')

   let charactersData = await fetchCharcters.json()
    charactersData.forEach(charData => {
        getDeathCount(charData.name).then(data=>{
            character.showDetails(charData, data[0].deathCount)
        })
            
        });

    

}


const getDeathCount = async (name) => {
   
    let fetchCount = await fetch(`https://www.breakingbadapi.com/api/death-count?name=${name}`)
    let count = await fetchCount.json()

    return count
}
getData();

const showContent = (id)=>{
   let content =  document.getElementById(id)
   let button = document.getElementById(`btn-${id}`)
   const show = ()=>{
        content.style.display = "block";
        button.innerHTML = `<i class="fa fa-chevron-up" ></i>`
    }

   const less=()=>{
        content.style.display = "none"
        button.innerHTML = `<i class="fa fa-chevron-down" ></i>`
    }

   content.style.display === "none"? show() : less()
  
}