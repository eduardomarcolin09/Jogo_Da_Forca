var objetivo = []

const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const palavras = ['abacate', 'cachorro', 'computador', 'ventilador', 'toalha', 'montanha', 'ocelote', 'farol', 'cachecol', 'rato',
'piscina', 'lampada', 'churrasco', 'quadro', 'tempo', 'garrafa', 'violino', 'parafuso', 'bicicleta', 'harmonia',
'abacaxi', 'monitor', 'horizonte', 'caminho', 'sorvete', 'fogueira', 'calendário', 'rascunho', 'almofada', 'travesseiro',
'espelho', 'sabedoria', 'planeta', 'piano', 'antena', 'lanterna', 'felicidade', 'porta', 'jornal', 'escultura',
'energia', 'caverna', 'folha', 'cachoeira', 'melodia', 'navio', 'velocidade', 'quadra', 'dinossauro', 'neblina',
'mochila', 'floresta', 'folclore', 'escada', 'Eduardo', 'oceano', 'colina', 'diamante', 'andorinha', 'brilho',
'nebulosa', 'concha', 'astronauta', 'selva', 'microfone', 'serenidade', 'cajado', 'miragem', 'sonho', 'sabonete',
'tabuleiro', 'ventania', 'cometa', 'carrinho', 'teclado', 'espinha', 'descoberta', 'vela', 'batata', 'girassol',
'elefante', 'mirtilo', 'pelicano', 'tomate', 'foguete', 'macaco', 'labirinto', 'girafa', 'plataforma', 'alegria'
]

let erros = 5 // Quantidade de Erros
let acertos = 0 // Acertos

function sortearPalavra() {
    const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)]

    // Atualiza o objetivo com a palavra sorteada
    document.getElementById('x').value = palavraSorteada
    atualizarObjetivo();
}

function verificarCampo() {
    var x = document.getElementById('x').value
    if (x.trim() === '') {
        alert('Por favor, digite um objetivo antes de enviar.')
    } else if (!isNaN(x)) {
        alert('Por favor, digite apenas letras no objetivo.')
        document.getElementById('x').value = ''
    } else {
        atualizarObjetivo()
    }
}

const reiniciarBotao = document.getElementById('reiniciarJogo')
reiniciarBotao.addEventListener('click', reiniciarJogo)

// Função para Reiniciar o Jogo
function reiniciarJogo() {
    // Resetar tudo
    erros = 5
    acertos = 0
    document.getElementById('erros').innerHTML = erros
    var palavraDiv = document.getElementById('palavra')
    palavraDiv.innerHTML = ''
    Array.from(document.getElementsByTagName('button')).forEach((btn) => {
        btn.disabled = false
        btn.classList.remove('bg-slate-300')
        btn.classList.add('hover:bg-cyan-600')
    })
    document.getElementById('x').value = ''
    desabilitarBotoes()
}

// Função para Desabilitar e Habilitar os Botões
function desabilitarBotoes() {
    const botoes = document.getElementById('botoes')
    Array.from(botoes.getElementsByTagName('button')).forEach((btn) => {
        btn.disabled = true
        btn.classList.remove('hover:bg-cyan-600')
        btn.classList.add('bg-slate-300')
    })
}

function habilitarBotoes() {
    const botoes = document.getElementById('botoes')
    Array.from(botoes.getElementsByTagName('button')).forEach((btn) => {
        btn.disabled = false
        btn.classList.remove('bg-slate-300')
        btn.classList.add('hover:bg-cyan-600')
    })
}

// Função para atualizar o Objetivo da Forca
function atualizarObjetivo() {
    var x = document.getElementById('x').value
    
    habilitarBotoes()
    erros = 5
    document.getElementById('erros').innerHTML = erros
    objetivo = x.toUpperCase().split('')

    // Remove as DIVs existentes
    var palavraDiv = document.getElementById('palavra')
    palavraDiv.innerHTML = ''

    // Cria novas DIVs com base no comprimento do novo objetivo
    objetivo.forEach((_, idx) => {
        const letra = document.createElement('DIV')
        letra.setAttribute('class', 'letra')
        letra.setAttribute('id', `letra${idx}`)
        letra.classList.add('p-5', 'text-center', 'text-4xl', 'flex', 'items-center', 'justify-center', 'border-dashed', 'border-2', 'border-black', 'w-12', 'h-12')
        palavraDiv.appendChild(letra)
    })

    document.getElementById('x').value = ''
}

const verificaFimJogo = () => {
    document.getElementById('erros').innerHTML = erros
    if (objetivo.length === 0) {
        desabilitarBotoes()
        return // Saia da função se o objetivo estiver vazio
    }

    if (erros === 0) {
        const palavraCorreta = objetivo.join('')
        alert('Você errou! A palavra era: ' + palavraCorreta)
        setTimeout(function () {
            reiniciarJogo()
            desabilitarBotoes()
        }, 3000)
    }

    if (acertos === objetivo.length) {
        alert('Parabéns você acertou a palavra!')
        setTimeout(function () {
            reiniciarJogo()
            desabilitarBotoes()
        }, 3000)
    }
}

const jogada = (l) => {
    if (objetivo.every((letra) => letra !== l)) {
        erros = erros-1
    } else {
        for (let i = 0; i < objetivo.length; i++) {
            if (l === objetivo[i]) {
                document.getElementById('letra' + i).innerHTML = l
                acertos++
                // Se a pessoa acerta a letra, os acertos aumentam e é adicionado a letra na forca
            }
        }
    }
    verificaFimJogo()
}

const botoes = document.getElementById('botoes')
letras.forEach((l) => {
    const btn = document.createElement('BUTTON')
    btn.setAttribute('type', 'button')
    btn.innerHTML = l
    btn.addEventListener('click', () => {
        // Desabilitando o botão depois do primeiro clique
        btn.disabled = true
        btn.classList.remove('hover:bg-cyan-600')
        btn.classList.add('bg-slate-300')
        jogada(btn.innerHTML)
    })
    // Adicionando CSS
    btn.classList.add('bg-sky-500/75', 'hover:bg-cyan-600', 'p-2', 'px-4', 'mx-1', 'mb-1', 'rounded-xl', 'text-base')
    botoes.appendChild(btn)
    desabilitarBotoes()
})
