var objetivo = []
const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const palavras = ['abacate', 'cachorro', 'computador', 'ventilador', 'toalha', 'montanha', 'ocelote', 'farol', 'cachecol', 'rato',
'piscina', 'lampada', 'churrasco', 'quadro', 'tempo', 'garrafa', 'violino', 'parafuso', 'bicicleta', 'harmonia',
'abacaxi', 'monitor', 'horizonte', 'caminho', 'sorvete', 'fogueira', 'tema', 'rascunho', 'almofada', 'travesseiro',
'espelho', 'sabedoria', 'planeta', 'piano', 'antena', 'lanterna', 'felicidade', 'porta', 'jornal', 'escultura',
'energia', 'caverna', 'folha', 'cachoeira', 'melodia', 'navio', 'velocidade', 'quadra', 'dinossauro', 'neblina',
'mochila', 'floresta', 'folclore', 'escada', 'Eduardo', 'oceano', 'colina', 'diamante', 'andorinha', 'brilho',
'nebulosa', 'concha', 'astronauta', 'selva', 'microfone', 'serenidade', 'cajado', 'miragem', 'sonho', 'sabonete',
'tabuleiro', 'ventania', 'cometa', 'carrinho', 'teclado', 'espinha', 'descoberta', 'vela', 'batata', 'girassol',
'elefante', 'mirtilo', 'pelicano', 'tomate', 'foguete', 'macaco', 'labirinto', 'girafa', 'plataforma', 'alegria'
]

var forca = document.getElementById('forca')
var btndica = document.getElementById('dica')
var estadoDica = 0
var palavraCorreta = ""
let erros = 5 // Quantidade de Erros
let acertos = 0 // Acertos

// Função pra remover acento (substituida pelo regex)
/*function removerAcentos(str) {
    // função pronta do google
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
} */

function Forca() {
    // daria pra usar CASE, prefiro IF
    if (erros === 4) {
        forca.innerHTML = "<pre> _______ <br> |/     | <br> |     (_) <br> |             <br> |             <br> |            </pre>";
    } else if (erros === 3) {
        forca.innerHTML = "<pre> _______ <br> |/     | <br> |     (_) <br> |     \\|/   <br> |             <br> |            </pre>";
    } else if (erros === 2) {
        forca.innerHTML = "<pre> _______ <br> |/     | <br> |     (_) <br> |     \\|/   <br> |      |      <br> |            </pre>";
    } else if (erros === 1) {
        forca.innerHTML = "<pre> _______ <br> |/     | <br> |     (_) <br> |     \\|/   <br> |      |      <br> |     / \\     </pre>";
    } else if (erros === 0) {
        forca.innerHTML = "<pre> _______ <br> |/     | <br> |     X_X <br> |     \\|/   <br> |      |      <br> |     / \\     </pre>";
    } 
    
}

// Função p/ sortear uma palavra do vetor "objetivo"
function sortearPalavra() {
    forca.innerHTML = '<pre> _______ <br> |/     | <br> |         <br> |             <br> |             <br> |            '
    const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)]
    document.getElementById('x').value = palavraSorteada
    atualizarObjetivo()
}

// Função pra verificar o value do campo de atualizar objetivo
function verificarCampo() {
    var x = document.getElementById('x').value
    var regex = /^[a-zA-Z]+$/
    if (x.trim() === '') {
        alert('Por favor, digite um objetivo antes de enviar')
    } else if (!regex.test(x)) {
        alert('Por favor, digite apenas letras sem caracteres especiais(espaços e acentos também)')
        document.getElementById('x').value = ''
    } else {
        atualizarObjetivo()
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    if(objetivo.length == 0) {
        alert('Não desista antes de tentar algum objetivo (:')
    }
    else {
        alert('A palavra era: ' + palavraCorreta)
        // Resetar tudo
        estadoDica = 0
        btndica.disabled = false
        btndica.classList.add('hover:bg-gray-700')
        btndica.classList.remove('bg-slate-300')
        objetivo = []
        erros = 5
        acertos = 0
        forca.innerHTML = '<pre> _______ <br> |/     | <br> |         <br> |             <br> |             <br> |            '
        document.getElementById('erros').innerHTML = erros
        var palavraDiv = document.getElementById('palavra')
        palavraDiv.innerHTML = ''
        Array.from(document.getElementsByTagName('buttonsletras')).forEach((btn) => {
            btn.disabled = false
            btn.classList.remove('bg-slate-300')
            btn.classList.add('hover:bg-cyan-600')
        })
        document.getElementById('x').value = ''
        desabilitarBotoes()
    }
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
    estadoDica = 0
    btndica.disabled = false
    btndica.classList.add('hover:bg-gray-700')
    btndica.classList.remove('bg-slate-300')
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
    forca.innerHTML = '<pre> _______ <br> |/     | <br> |         <br> |             <br> |             <br> |            '
    habilitarBotoes()
    erros = 5
    document.getElementById('erros').innerHTML = erros
    objetivo = x.toUpperCase().split('')
    palavraCorreta = objetivo.join('')
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

// Função para dar dica
function Dica() {
    if(objetivo.length == 0) {
        alert('Digite ou sorteie um objetivo antes de usar a Dica (:')
    }
    if (estadoDica === 0) {
        // Mostra as duas primeiras letras no primeiro clique
        var duasPrimeirasLetras = objetivo.slice(0, 2)
        var dicaRestante = Array(objetivo.length - 2).fill('_')
        var dicaCompleta = duasPrimeirasLetras.concat(dicaRestante)
        var dicaString = dicaCompleta.join(' ')
        alert(dicaString)

        estadoDica = 1;
    } else if (estadoDica === 1) {
        // Mostra as duas primeiras e as duas últimas letras no segundo clique
        var dicaCompleta = objetivo.slice(0, 2).concat(Array(objetivo.length - 4).fill('_'), objetivo.slice(-2));
        var dicaString = dicaCompleta.join(' ');
        alert(dicaString);

        // Resetar
        estadoDica = 0;
        btndica.disabled = true
        btndica.classList.remove('hover:bg-gray-700')
        btndica.classList.add('bg-slate-300')
    }
}

const verificaFimJogo = () => {
    document.getElementById('erros').innerHTML = erros
    if (objetivo.length === 0) {
        desabilitarBotoes()
        return // Vai sair da função se o objetivo estiver vazio
    }

    if (erros === 0) {
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
    Forca()
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