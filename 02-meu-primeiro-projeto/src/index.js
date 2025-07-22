const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function jogador1(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

function jogador2(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

function numbJogador(num) {
  switch(num) {
    case "1": return player1;
    case "2": return player2;
    case "3": return player3;
    case "4": return player4;
    case "5": return player5;
    case "6": return player6;
    default: return null;
  }
}


const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
    Turbo: 0,
};

const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
    Turbo: 0,
};

const player3 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
    Turbo: 0,
};

const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS:  0,
    Turbo: 0,
};

const player5 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
    Turbo: 0,
};

const player6 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
    Turbo: 0, 
};


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result; 

    switch (true){
        case random < 0.33:
            result = "RETA";
            break;
    case random < 0.66:
            result = "CURVA";
            break;
    default:
        result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de  ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}


async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        
        //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

      


        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1, 
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2, 
                character2.VELOCIDADE
            );
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1, 
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2, 
                character2.MANOBRABILIDADE
            );
        }
    

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            

            console.log(`${character1.NOME} confrontou ${character2.NOME}!🥋`)
            
            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1, 
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2, 
                character2.PODER
            );
            
            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--; 
            }
            
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }

            
            
            console.log(powerResult2 == powerResult1 ? "Confronto empatado!" : "");
        }
            
        //verificar quem ganhou a rodada
        
        if(totalTestSkill1 > totalTestSkill2) {
            let Turbo = diceResult1 + character1.Turbo;
            
            console.log(`${character1.NOME} Marcou um ponto!\n`);
            character1.PONTOS++;
                        
            if (Math.random() < 0.4) {
                character1.Turbo++;
                console.log(`${character1.NOME} ganhou 1 turbo! 🚀`);
            }
        }
        else if(totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} Marcou um ponto!\n`);
            character2.PONTOS ++;

            if (Math.random() < 0.4) {
                character2.Turbo++;
                console.log(`${character2.NOME} ganhou 1 ponto extra de turbo! 🚀`);
            }
        }

        console.log("\n----------------------------------\n");
    }    

    
    
}


async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log (`${character1.NOME}: ${character1.PONTOS}ponto(s)`);
    console.log (`${character2.NOME}: ${character2.PONTOS}ponto(s)`);

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida! 🏆`);
    
    
    else if(character2.PONTOS > character1.PONTOS) 
        console.log(`\n${character2.NOME} venceu a corrida! 🏆`);
    
    else console.log(`\nA corrida terminou empatada! 🤝`);

   
    
}



(async function main() {
    const escolha1 = await jogador1(`\nEcolhe o 1° personagem \n1 - ${player1.NOME} \n2 - ${player2.NOME} \n3 - ${player3.NOME} \n4 - ${player4.NOME} \n5 - ${player5.NOME} \n6 - ${player6.NOME} \n\nDigite o número do 1º personagem: `);
 

    const personagem1 = numbJogador(escolha1);
    if (!personagem1) {
        console.log("Escolha inválida!");
        process.exit(1);
    }

    console.log('Você escolheu:', personagem1.NOME);

    const escolha2 = await jogador2(`\nEscolha o 2° personagem \n1 - ${player1.NOME} \n2 - ${player2.NOME} \n3 - ${player3.NOME} \n4 - ${player4.NOME} \n5 - ${player5.NOME} \n6 - ${player6.NOME} \n\nDigite o número do 2º personagem: `);  
    rl.close();
        const personagem2 = numbJogador(escolha2); 
    if (!personagem2 || personagem2 === personagem1) {
        console.log("personagem já escolhido, escolha outro");
        process.exit(1);
    }

    console.log('Você escolheu:', personagem2.NOME,"\n");


    await playRaceEngine(personagem1,  personagem2);
    await declareWinner(personagem1, personagem2);
})();