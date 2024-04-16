const quadrados = document.getElementsByClassName('item');

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
                        click = 0.5;
                        break;
                    }
                }
            }
            click += 1;
            }
        }
}