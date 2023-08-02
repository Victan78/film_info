var carte = document.querySelectorAll(".child")
var search_box = document.querySelector(".search-box")
var search_btn = document.querySelector(".search-btn")
var parent=document.querySelector('.parent')
localStorage.setItem('page',1)
search_box.addEventListener('click', () => {
    search_box.style.width = "100%"
})
search_box.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        search_btn.click()
    }
})
function checkwindow(){
    if(window.innerWidth<880){
       carte.forEach(el => {
        el.addEventListener("mousemove", () => {
          return
        })
        el.addEventListener("mouseleave", () => {
            return
        })
    })
    }
    else{
        parallax(document.querySelectorAll(".child"))
    }
}
function parallax(carte){carte.forEach(el =>{
    el.addEventListener("mousemove", e =>{
    
        let elrect = el.getBoundingClientRect()
        
        let x = e.clientX - elrect.x
        let y = e.clientY - elrect.y
    
        let midcardwidth = elrect.width / 2
        let midcardheight = elrect.height / 2
        let angleY = -(x - midcardwidth) / 8
        let angleX = (y - midcardheight) / 8.5
    
        let glowX = x / elrect.width * 100
        let glowY = y / elrect.height * 100
        
    
        el.style.transition = `all 0.05s `
        el.style.transform = ` perspective(650px)  rotateX(${angleX}deg) rotateY(${angleY}deg) `
        
        
    })
    el.addEventListener("mouseleave",()=>{
        
    
        el.style.transition = `all 0.3s `
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) `
    })
    // el.addEventListener("mouseleave",()=>{
       
    //     el.children[1].style.opacity=`0.2`
    //     el.children[0].style.opacity = `1`
    //     el.style.transition = `all 0.5s `
    //     el.style.transform = `rotateX(0) rotateY(0) `
    // })
    // el.addEventListener("mouseover",()=>{
    //   el.style.transition = `all 1s `
    //   el.style.background=`none`
    //   el.children[0].style.opacity = `1`
    // })
    console.log("ok")
  
  })}


function fechting(page){
    var image=[]
var loader=[]
    this.fetch(`https://api.themoviedb.org/3/discover/movie?api_key=89346d18f864e3af588a4b42533f33b2&page=${page} `, options)
    .then(response => response.json())
    //recuperer les données dans une variable
    .then(data => {
        console.log(data)
      
        for(var i=0;i<data.results.length;i++){
          
                
                var div=document.createElement('div')
                div.id=data.results[i].id
                div.className='child'
                var img=document.createElement('img')
                var loader=document.createElement('div')
                loader.className='loader'
                div.appendChild(loader)
                var title=document.createElement('h1')
                title.className='title'
                title.innerHTML=data.results[i].title
                if(window.innerWidth<880){
                    title.style.transform=`translateX(-50%) translateY(0px)`
                }
                div.appendChild(title)
                img.src=`https://image.tmdb.org/t/p/original${data.results[i].poster_path}`
                
                div.appendChild(img)
               
                parent.appendChild(div)
                image[i]=img
           
              
                setTimeout(() => {
                    document.querySelectorAll('.loader').forEach(el=>{
                        el.remove()
                    })}, 1000);
            
               
        }
        document.querySelectorAll('.child').forEach(el=>{
            el.addEventListener('click',()=>{
                details(el.id)
                


            })
        })
        for (let i = 0; i < image.length; i++) {
            image[i].addEventListener('load', () => {
                image[i].classList.add('loaded')
                
                
            })
        }
     
        if(window.innerWidth>920){

        parallax(document.querySelectorAll(".child"))}
       
    
        
        
       
    });
    var page=parseInt(localStorage.getItem('page'))+1
    localStorage.setItem('page',page)
}



const options = {
  
	method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization'	:	'sha512-2+9+PJiJ7jr8GEUa4sP+tbg9om25Mvtxb304eyjw+2EbPEsoSBD+ywvwZMq8k2OIrzStBQzRLWVVtWMmUMU3IQ==?uURc'

    }

};
var image=[]
var parent=document.querySelector('.parent')

//appeler la fonction pour les films par page
fechting(localStorage.getItem('page'))


const charger_davatange = document.querySelector('.charger_davatange')


charger_davatange.addEventListener('click', () => {
    fechting(localStorage.getItem('page'))
    console.log("ok")
}
)

var id=[]
var id_etat=""
async function search(keyword){

    parent.innerHTML=''
    var image=[]
    var loader=[]
    var id=[]
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM0NmQxOGY4NjRlM2FmNTg4YTRiNDI1MzNmMzNiMiIsInN1YiI6IjY0YzJmYzQ3ZWMzNzBjMDBmZmI5ZjAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CHtpAItCDg1I9sk4FBO5V9EYlCa7FH4ldmJfJhquURc'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}`, options)
        .then(response => response.json())
        .then(response => {console.log(response)
            if(response.results.length==0){
                parent.innerHTML='<p style="color: #ffff">aucun resultat</p>'
            }
            for(var i=0;i<response.results.length;i++){
               
                var div=document.createElement('div')
                div.className='child'
                div.id=response.results[i].id
                id[i]=response.results[i].id
                var img=document.createElement('img')
                var loader=document.createElement('div')
                loader.className='loader'
                div.appendChild(loader)
                var title=document.createElement('h1')
                title.className='title'
                title.innerHTML=response.results[i].title
               
                if(window.innerWidth<880){
                    title.style.transform=`translateX(-50%) translateY(0px)`
                }
                div.appendChild(title)
                img.src=`https://image.tmdb.org/t/p/original${response.results[i].poster_path}`
                if(response.results[i].poster_path==null){
                    img.src='assets/svg/notfound.svg'
                }
                div.appendChild(img)
               
                parent.appendChild(div)
                image[i]=img
            //afficher les details du film    
       
                
                setTimeout(() => {
                    document.querySelectorAll('.loader').forEach(el=>{
                        el.remove()
                    })}, 1000);


}

document.querySelectorAll('.child').forEach(el=>{
    el.addEventListener('click',()=>{
        details(el.id)

})
})
for (let i = 0; i < image.length; i++) {
    image[i].addEventListener('load', () => {
        image[i].classList.add('loaded')

    })
}
if(window.innerWidth>920){

    parallax(document.querySelectorAll(".child"))}



        })



    }

  
    


//fonction pour afficher les details du film dans un modal
function details(id){
    var modal=document.querySelector('.modal')
    var modal_content=document.querySelector('.modal-content')
    var modal_img=document.querySelector('.modal-img')
    var modal_title=document.querySelector('.modal-title')
    var modal_overview=document.querySelector('.modal-overview')
    var modal_date=document.querySelector('.modal-date')
    var modal_vote=document.querySelector('.modal-vote')
    var modal_close=document.querySelector('.modal-close')

  
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM0NmQxOGY4NjRlM2FmNTg4YTRiNDI1MzNmMzNiMiIsInN1YiI6IjY0YzJmYzQ3ZWMzNzBjMDBmZmI5ZjAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CHtpAItCDg1I9sk4FBO5V9EYlCa7FH4ldmJfJhquURc'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-EU`, options)
        .then(response => response.json())
        .then(response => {console.log(response)
        
           
                var modal = document.createElement('div')
                var modal_container = document.querySelector('.modal-container')
                modal.className = 'modal'
                var modal_content = document.createElement('div')
                modal_content.className = 'modal-content'
                var modal_img_box = document.createElement('div')
                modal_img_box.className = 'modal-img-box'
                var modal_img = document.createElement('img')
                modal_img.className = 'modal-img'
                modal_img_box.appendChild(modal_img)
                modal_img.src = `https://image.tmdb.org/t/p/original${response.backdrop_path}`
                if (response.backdrop_path == null) {
                    modal_img.src = 'assets/svg/notfound.svg'
                }
                console.log(modal_img.src)
                var modal_title = document.createElement('h1')
                modal_title.className = 'modal-title'
                modal_title.innerHTML = response.title
                var modal_overview = document.createElement('p')
                modal_overview.className = 'modal-overview'
                modal_overview.innerHTML = response.overview
                var modal_date = document.createElement('p')
                modal_date.className = 'modal-date'
                modal_date.innerHTML ="Date de sortie: " + response.release_date
                var modal_vote = document.createElement('p')
                modal_vote.className = 'modal-vote'
                modal_vote.innerHTML = response.vote_average
                modal_vote.innerHTML = modal_vote.innerHTML.slice(0, 3)
                var modal_close = document.createElement('div')
                modal_close.className = 'modal-close'
                modal_close.innerHTML = 'X'
                var modal_genre = document.createElement('p')
                modal_genre.className = 'modal-genre'
                var genre = []
                for(let i=0;i<response.genres.length;i++){
                    genre[i]=response.genres[i].name
                    
                }
                modal_genre.innerHTML = genre.join(' / ')

                modal_content.appendChild(modal_img_box)
                modal_content.appendChild(modal_title)
                modal_content.appendChild(modal_genre)
                modal_content.appendChild(modal_overview)
                modal_content.appendChild(modal_date)
                modal_content.appendChild(modal_vote)
                modal_content.appendChild(modal_close)
                modal.appendChild(modal_content)
                modal_container.appendChild(modal)
                modal_container.style.display = 'block'
                modal_container.style.opacity = '1'
                modal_close.addEventListener('click', () => {
                    modal.style.scale = '1.5'
                    modal_container.style.opacity = '0'
                    modal.style.opacity = '0'
                    
                    
                    setTimeout(() => {
                        modal.remove()
                        modal_container.style.display = 'none'
                    }
                        , 200)
                }
                )

            }
        
        )
        .catch(err => console.error(err));
    }

   














search_btn.addEventListener('click',()=>{
    console.log(search_box.value)
    search(search_box.value)
    search_box.style.width = "300px"
}
)