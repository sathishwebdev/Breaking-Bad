Element.prototype.set = function(props){
    let keys =  Object.keys(props)
    // set Attributes
    keys.forEach(key=>{
        this.setAttribute(key, props[key])
    })
}



class Character{
    


    showDetails({char_id,name, img, portrayed,occupation, nickname, status}, dCount, dInfo){
        let root = document.getElementById('root')
        console.log(dInfo)
        const create = (val) => document.createElement(val)
        let imgCon = create('div')
        let card = create('div')
        card.set({class:"card", id:`card-${char_id}`})
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
        <p style="font-size: small;"> ${status === 'Alive'? '<span> </span>'  : `<span>Death Info : In Season ${dInfo.season} Episode ${dInfo.episode}, He was ${dInfo.cause} Responsible of death is ${dInfo.responsible} and the last words are "${dInfo.last_words}".   </span>`} </p>
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
        p.innerHTML = `${name} <span style="font-size: small;"><span style="color: ${status === 'Alive'? 'green' : status === 'Deceased' ? 'red' : 'orange'}; border:1px solid ${status === 'Alive'? 'green' : status === 'Deceased' ? 'red' : 'orange'}; padding: 3px; margin: 5px; border-radius: 5px; ">  ${status}</span></span> <p style="font-size: small; color: grey;"> as ${portrayed}</p>`
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
            character.showDetails(charData, data[0].deathCount, data[1] )
        })
            
        });

    

}


const getDeathCount = async (name) => {
   
    let fetchCount = await fetch(`https://www.breakingbadapi.com/api/death-count?name=${name}`)
    let count = await fetchCount.json()
    let fetchQuote = await fetch(`https://www.breakingbadapi.com/api/death?name=${name}`)
    let deathInfo = await fetchQuote.json()
    return [...count,...deathInfo]
}
getData();

const showContent = (id)=>{
   let content =  document.getElementById(id)
   let button = document.getElementById(`btn-${id}`)
   let card = document.getElementById(`card-${id}`)
   const show = ()=>{
        content.set({style:"display: block;"})
        card.set({style:"width: 100%; flex-direction: row"})
        button.innerHTML = `<i class="fa fa-chevron-up" ></i>`
    }

   const less=()=>{
        content.set({style: "display:none;"})
        card.set({style:"flex-directon: column"})
        button.innerHTML = `<i class="fa fa-chevron-down" ></i>`
    }

   content.style.display === "none"? show() : less()
  
}

// fetch('https://www.breakingbadapi.com/api/deaths').then(data=>data.json()).then(data=>console.log(data))