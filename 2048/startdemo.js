function startGame(){
    console.log("SPEL BEGIIINT");
    this.toggleScreen('start', false);
    this.toggleScreen('game', true);

}


function toggleScreen(id, toggle){
    let element = document.getElementById(id);
    let disp = (toggle) ? 'block' : 'none';
    element.style.display = disp;
}

document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded qui va se lancer quand le HTML est complètement chargé
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score') 
    const resultDisplay = document.getElementById('result')
    const bouton = document.getElementById('namebutton');
    const overlay = document.getElementById('overlay');
    const popUpTitle = document.getElementById('title');

    let width = 4; 
    let squares = [];
    let score = 0 
    
    //Bord creëeren
    function createBord(){
        for(let i = 0; i < width*width; i++){
            square = document.createElement('div');
            square.innerHTML = 0; 
            gridDisplay.appendChild(square);
            squares.push(square);
            
        }
        generate()
        generate()
    }
    createBord();
    
    // le bouton qui recommence le jeu; werkt 
    const buttonNew = document.getElementById('hey');
    buttonNew.addEventListener('click', () => {
        window.location.reload();
    })
    
  
    

    //Random nr
    function generate() {
        let randomNumber = Math.floor(Math.random()*squares.length);
        const random = [2, 4];
        if (squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = random[Math.floor(Math.random() * random.length)];
            checkForLose()
        } else generate()
    }
    
    
    function rechts(){ // Loop over alles 
        for(let i = 0; i < width*width; i++){
            if(i % 4 === 0){
                let een = squares[i].innerHTML;
                let twee = squares[i+1].innerHTML;
                let drie = squares[i+2].innerHTML;
                let vier = squares[i+3].innerHTML;
                let rij = [parseInt(een), parseInt(twee), parseInt(drie), parseInt(vier)]
                console.log(rij);
    
                let filteredRow = rij.filter(num => num) 
                //console.log(filteredRow);
                let missing = 4 - filteredRow.length; 
                let zeros = Array(missing).fill(0); 
                //console.log(zeros);
                let nieuwRij = zeros.concat(filteredRow)
                //console.log(nieuwRij);
    
                squares[i].innerHTML = nieuwRij[0];
                squares[i+1].innerHTML = nieuwRij[1];
                squares[i+2].innerHTML = nieuwRij[2];
                squares[i+3].innerHTML = nieuwRij[3];
    
            }
        }
    }
    
    
    
    function links(){ // Loop over alles 
        for(let i = 0; i < width*width; i++){
            if(i % 4 === 0){
                let een = squares[i].innerHTML;
                let twee = squares[i+1].innerHTML;
                let drie = squares[i+2].innerHTML;
                let vier = squares[i+3].innerHTML;
                let rij = [parseInt(een), parseInt(twee), parseInt(drie), parseInt(vier)]
                //console.log(rij);
    
                let filteredRow = rij.filter(num => num) 
                //console.log(filteredRow);
                let missing = 4 - filteredRow.length; 
                let zeros = Array(missing).fill(0); 
                //console.log(zeros);
                let nieuwRij = filteredRow.concat(zeros); // verandering van f & z (regel 48) om van links naar rechts te gaan
                //console.log(nieuwRij);
    
                squares[i].innerHTML = nieuwRij[0];
                squares[i+1].innerHTML = nieuwRij[1];
                squares[i+2].innerHTML = nieuwRij[2];
                squares[i+3].innerHTML = nieuwRij[3];
    
            }
        }
    }
    
    
    function beneden() {
        for(let i = 0; i < 4; i++){
            let een = squares[i].innerHTML
            let twee = squares[i+width].innerHTML
            let drie = squares[i+(width*2)].innerHTML
            let vier = squares[i+(width*3)].innerHTML
            let column = [parseInt(een), parseInt(twee), parseInt(drie), parseInt(vier)]
            
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let nieuwColumn = zeros.concat(filteredColumn)
        
            squares[i].innerHTML = nieuwColumn[0]
            squares[i+width].innerHTML = nieuwColumn[1]
            squares[i+(width*2)].innerHTML = nieuwColumn[2]
            squares[i+(width*3)].innerHTML = nieuwColumn[3]
    
        }
    }
    
    function boven() {
        for(let i = 0; i < 4; i++){
            let een = squares[i].innerHTML
            let twee = squares[i+width].innerHTML
            let drie = squares[i+(width*2)].innerHTML
            let vier = squares[i+(width*3)].innerHTML
            let column = [parseInt(een), parseInt(twee), parseInt(drie), parseInt(vier)]
            
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let nieuwColumn = zeros.concat(filteredColumn)
        
            squares[i].innerHTML = nieuwColumn[0]
            squares[i+width].innerHTML = nieuwColumn[1]
            squares[i+(width*2)].innerHTML = nieuwColumn[2]
            squares[i+(width*3)].innerHTML = nieuwColumn[3]
    
        }
    }
    
    
    function combineerRij(){ 
        for(let i = 0; i < 15; i++){ // Pq 15? Pcq le square 16 (tout en bas a droite) n'existe pas donc pas besoin de le check
            if(squares[i].innerHTML === squares[i+1].innerHTML){ // Si les 2 correspondent on les combinent ensemble
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i+1].innerHTML = 0;
                score += combineTotal
                scoreDisplay.innerHTML = score
            }
        } 
         checkForWin() // Pour check a chaque mouvement si tu gagne ou aps 
         Colours()
        }

    function combineerKolom() {
        for(let i=0; i < 12; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combineTotal;
                squares[i+width].innerHTML = 0;
                score += combineTotal
                scoreDisplay.innerHTML = score
    
            }
        }
         checkForWin() // Pour check a chaque mouvement si tu gagne ou pas 
         Colours()
        }
    
    
    function control(e) {  // e.key est mieux que keyCode; keyCode is deprecated
        // if(e.keyCode === 39){
        //     keyRechts()
        // } else if (e.keyCode === 37){
        //     keyLinks()
        // } else if (e.keyCode === 38){
        //     keyUp()
        // } else if (e.keyCode === 40){
        //     keyDown()
        // }

        switch (e.key) {
            case "ArrowRight": keyRechts();
                break;
            case "ArrowLeft": keyLinks();
                break;
            case "ArrowUp": keyUp();
                break;
            case "ArrowDown": keyDown();
                break;
                
            default:
                break;
        }
    }
    document.addEventListener('keyup', control) 
    
    function keyRechts(){
        rechts()
        combineerRij()
        rechts()
        generate()
    }
    
    function keyLinks(){
        links()
        combineerRij()
        links()
        generate()
    }
    
    function keyDown(){
        beneden()
        combineerKolom()
        beneden()
        generate()
    
    }
    
    function keyUp(){
        boven()
        combineerKolom()
        boven()
        generate()    
    }


    
    function popup(){
        window.location = 'popup.html';
        bouton.addEventListener('click', () => {
            function addUser(user, score){
                this.user = user;
                this.score = score;
            }  
                
                // bouton.preventDefault();
            const user = document.getElementById('naam').value;
            const newUser = new addUser(user, score);
            localStorage.setItem('user',  JSON.stringify(newUser));
                
                
            console.log(newUser.user);
            
                
            
                
            })
    }
    
    function checkForWin(){
         for(let i = 0; i < squares.length; i++){
             if(squares[i].innerHTML == 2048) {
               
            //    resultDisplay.innerHTML = 'U bent gewonnen !'
               document.removeEventListener('keyup', control)
               popup()
               popUpTitle.innerHTML = 'U bent gewonnen !'

            }
       } 
    }
    
    function checkForLose(){
    //     let isOver = true; 
    //     for(let i = 0; i <= 16; i++){
    //         for(let j = 0; j <= 15; j++){
    //             let check = parseInt(document.getElementById(i+""+j).innerHTML);
    //             let checking = parseInt(document.getElementById((i+1)+""+j).innerHTML);
    //             if(check == checking){
    //                 isOver = false; 
    //                 break;
    //             }
    //         }
    //     }

    //     if(isOver == true){
    //         for(let i = 0; i <= 16; i++){
    //             for(let j = 0; j <= 15; j++){
    //             let check = parseInt(document.getElementById(i+""+j).innerHTML);
    //             let checking = parseInt(document.getElementById(i+""+(j+1)).innerHTML);
    //             if(check == checking){
    //                 isOver = false; 
    //                 break;
    //             }
    //             }
    //         }
    //     }

    //     if(isOver){
    //         alert("Game over ! ");
    //     }

    //     return false;
    // }


     let nul = 0
     for(let i = 0; i < squares.length; i++){
          if(squares[i].innerHTML == 0){
              nul++
          }
      }
      if(nul === 0) {
          // resultDisplay.innerHTML = 'You Lose !'
         document.removeEventListener('keyup', control)
         popup()
         popUpTitle.innerHTML = 'U bent verloren..'
         
          }
    
    }

    function Colours(){
        for (let i=0; i < squares.length; i++) {
        switch(squares[i].innerHTML){
            case '0': squares[i].style.backgroundColor = '#eee4da'
            break;
            case '2': squares[i].style.backgroundColor ='#F6CED8'
            break;
            case '4': squares[i].style.backgroundColor ='#F7BE81'
            break;
            case '8': squares[i].style.backgroundColor ='#F3F781'
            break;
            case '16': squares[i].style.backgroundColor ='#BEF781'
            break;
            case '32': squares[i].style.backgroundColor ='#81F7D8'
            break;
            case '64': squares[i].style.backgroundColor ='#58D3F7'
            break;
            case '128': squares[i].style.backgroundColor ='#FA58F4'
            break;
            case '256': squares[i].style.backgroundColor ='#A901DB'
            break;
            case '512': squares[i].style.backgroundColor ='#01DF3A'
            break;
            case '1024': squares[i].style.backgroundColor ='#D7DF01'
            break;
            case '2048': squares[i].style.backgroundColor ='#D7DF01'
            break;
            default: squares[i].style.backgroundColor = '#ffffff'

        }
    }
    }
    Colours()
    
    
    

    
});