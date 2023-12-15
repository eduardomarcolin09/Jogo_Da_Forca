var objetivo = [];
const letras = ['A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P','Q','R','S','T','U',
'V','W','X','Y','Z'];

let errors = 0 // Quantidade de Erros
let acertos = 0 // Acertos

const reiniciarBotao = document.getElementById('reiniciarJogo');
reiniciarBotao.addEventListener('click', reiniciarJogo);

function reiniciarJogo() {
    location.reload(); 
}

function atualizarObjetivo() {
      var x = document.getElementById("x").value;
      objetivo = x.toUpperCase().split('');

      // Remove as DIVs existentes
      var palavraDiv = document.getElementById("palavra");
      palavraDiv.innerHTML = "";

      // Cria novas DIVs com base no comprimento do novo objetivo
      objetivo.forEach((_, idx) => {
        const letra = document.createElement('DIV');
        letra.setAttribute('class', 'letra');
        letra.setAttribute('id', `letra${idx}`);
        letra.classList.add('p-5', 'text-center', 'text-4xl', 'flex', 'items-center', 'justify-center','border-dashed','border-2','border-black','w-12','h-12');
        palavraDiv.appendChild(letra);
      });
      document.getElementById("x").value = "";
  }

const verificaFimJogo = () => {
    document.getElementById('errors').innerHTML = errors
    if (errors === 3 || acertos === objetivo.length){ //
        alert('FIM DO JOGO')
        reiniciarJogo()
        Array.from(document.getElementsByTagName('button')).forEach(btn => btn.disabled = true) 
        // Se a pessoa errar 3 vezes, da "Fim de Jogo" e os botões são desabilitados
        // Ou a pessoa acerta a palavra, também da "Fim de Jogo" e os botoões são desabilitados
}
}

const jogada = (l) => {
    if (objetivo.every(letra => letra !== l)){
        errors++
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

const botoes = document.getElementById('botoes')
letras.forEach(l => {
    const btn = document.createElement('BUTTON')
    btn.setAttribute('type','button')
    btn.innerHTML = l
    btn.addEventListener('click', () => {
        // Desabilitando o botão depois do primeiro clique
        btn.disabled = true
        btn.classList.remove('hover:bg-cyan-600')
        btn.classList.add(
            'bg-slate-300'
        )
        jogada(btn.innerHTML)
    })
    // Adicionando CSS
    btn.classList.add(
        'bg-sky-500/75','hover:bg-cyan-600','p-2','px-4','mx-1','mb-1','rounded-xl','text-base'
        ) 
    botoes.appendChild(btn)
})