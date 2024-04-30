const quadrados = document.getElementsByClassName('item');
const reset = document.getElementById('restart');

const P1_pontuacao_txt = document.getElementById('pontuacao_x');
const P2_pontuacao_txt = document.getElementById('pontuacao_o');

var P1_pontuacao_valor = 0;
var P2_pontuacao_valor = 0;

var click = 0;

var player1 = []
var player2 = []

const tabela_de_vitoria = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
]

function criaX(item){
    const X = document.createElement('span')
    X.classList.add('X')
    item.appendChild(X);
}
function criaO(item){
    const O = document.createElement('span')
    O.classList.add('O')
    item.appendChild(O);
}
function verificaVitoria(jogadas, vitoria){
    return vitoria.every(numero => jogadas.includes(numero));
}
function geraPontuacao(){
    if(click % 2 == 0){
        P1_pontuacao_valor++;
    } else if(click % 2 == 1){
        P2_pontuacao_valor++;
    }
    pontuacaoValores();
}
function pontuacaoValores(){
    P1_pontuacao_txt.innerHTML = P1_pontuacao_valor;
    P2_pontuacao_txt.innerHTML = P2_pontuacao_valor;
}

for(let i = 0; i<quadrados.length; i++){
    const item = quadrados[i];
        item.onclick = () => {

        // adiciona um novo X ou O apenas se a casa já não tiver um
        if(!item.hasChildNodes()){
            // jogadas do jogador1
            if(click % 2 == 0){
                criaX(item);
                // adiciona esta às jogadas do jogador
                player1.push(i+1)
                
                // verifica se as jogadas do jogador estão presentes
                // na tabela de vitória
                for (const vitoria of tabela_de_vitoria) {
                    if (verificaVitoria(player1, vitoria)) {
                        // destaca os quadrados que ocasionaram a vitória
                        for (const posicao of vitoria) {
                            quadrados[posicao - 1].classList.add('destaque');
                        }
                        geraPontuacao();
                        click = 0.5;

                        break;
                    }
                }
            }
            // jogadas do jogador2
            else if(click % 2 == 1) {
                criaO(item);
                // adiciona esta às jogadas do jogador
                player2.push(i+1)
    
                // verifica se as jogadas do jogador estão presentes
                // na tabela de vitória
                for (const vitoria of tabela_de_vitoria) {
                    if (verificaVitoria(player2, vitoria)) {
                        // destaca os quadrados que ocasionaram a vitória
                        for (const posicao of vitoria) {
                            quadrados[posicao - 1].classList.add('destaque');
                        }
                        geraPontuacao();
                        click = 0.5;
                        break;
                    }
                }
            }
            click += 1;
            }
        }
}

pontuacaoValores();

reset.addEventListener('click', () => { // reseta o jogo, exceto o placar
    player1 = []
    player2 = []
    click = 0;
    for(let i = 0; i<quadrados.length; i++){ // tira as jogadas e cor de cada casa do tabuleiro
        const casa = quadrados[i]
        if(casa.classList.contains('destaque')){
            casa.classList.remove('destaque');
        }
        while(casa.firstChild){
            casa.removeChild(casa.firstChild);
        }
    }
})