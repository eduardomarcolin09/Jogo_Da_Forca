const objetivo = ['B','R','A','S','I','L'];
const letras = ['A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P','Q','R','S','T','U',
'V','W','X','Y','Z'];

let errors = 0 // Quantidade de Erros
let acertos = 0 // Acertos

const verificaFimJogo = () => {
    document.getElementById('errors').innerHTML = errors
    if (errors === 3 || acertos === objetivo.length){ //
        alert('FIM DO JOGO')
        Array.from(document.getElementsByTagName('button')).forEach(btn => btn.disabled = true) 
        // Se a pessoa errar 3 vezes, da "Fim de Jogo" e os botões são desabilitados
        // Ou a pessoa acerta a palavra, também da "Fim de Jogo" e os botoões são desabilitados
}
}

const jogada = (l) => {
    if (objetivo.every(letra => letra !== l)){
        errors++
        // Se a pessoa errar a letra, os erros aumentam
    }else {
        for(let i = 0; i < objetivo.length; i++){
            if(l === objetivo[i]){
                document.getElementById('letra' + i).innerHTML = l
                acertos++
                // Se a pessoa acerta a letra, os acertos aumentam e é adicionado a letra na forca
            }
        }
    }
    verificaFimJogo()
}

const palavra = document.getElementById('palavra')
objetivo.forEach((_,idx) => {
    const letra = document.createElement('DIV')
    letra.setAttribute('class','letra')
    letra.setAttribute('id',`letra${idx}`)
    palavra.appendChild(letra)
    // A estrutura HTML criada a partir do JS
})

const botoes = document.getElementById('botoes')
letras.forEach(l => {
    const btn = document.createElement('BUTTON')
    btn.setAttribute('type','button')
    btn.innerHTML = l
    btn.addEventListener('click', () => {
        // Desabilitando o botão depois do 
        // primeiro clique
        btn.disabled = true
        jogada(btn.innerHTML)
    })
    botoes.appendChild(btn)
})
