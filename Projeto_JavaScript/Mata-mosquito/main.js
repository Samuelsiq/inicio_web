var altura = 0
var largura = 0
var vidas = 3
var tempo = 15
var tempo_mosca = 1500

var nivel = window.location.search
nivel = nivel.replace('?','')
if(nivel == 'normal'){
    tempo_mosca = 1500
} else if (nivel == 'dificil') {
    tempo_mosca = 1000
}else if (nivel == 'ChuckNorris'){
    tempo_mosca = 650
}
var cronometro = setInterval(function(){
   
    tempo--
    if(tempo<0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'win.html'
    }
    document.getElementById('cronometro').innerHTML = tempo
   
}, 1000)

function atualiza_pagina(){
    altura = window.innerHeight
    largura = window.innerWidth
}
atualiza_pagina()
function pos_Mosquito(){
    
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png' 
       

        vidas--
        console.log(vidas)
        if(vidas==0){
            window.location.href = 'game_over.html'
            
        } 
    }

    var posX = Math.floor(Math.random() * largura) -90
    var posY = Math.floor(Math.random() * altura) -90

    posX = posX<0 ? 0 : posX
    posY = posY<0 ? 0 : posY

    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanho_Mosquito() + ' ' + lado_Mosquito()
    mosquito.style.left= posX +'px'
    mosquito.style.top= posY +'px'
    mosquito.style.position= 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){ this.remove()}
    document.body.appendChild(mosquito)
}

function tamanho_Mosquito(){
    var classe = Math.floor(Math.random()*3)
    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function lado_Mosquito(){
    var classe = Math.floor(Math.random()*2)
    switch (classe){
        case 0:
            return 'lado_A'
        default:
            return 'lado_B'
    }

}