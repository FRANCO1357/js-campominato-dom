// RECUPERO IL BOTTONE
const playButton = document.getElementById('play');

// FUNZIONE PER INIZIAREIL GIOCO
function play(){
    this.innerText = 'Ricomincia!';

    const level = document.getElementById('level');
    let gameLevel = level.value;
    console.log(gameLevel);

    // DEFINISCO IL NUMERO DI CELLE IN BASE AL LIVELLO
    if (gameLevel === 'easy'){
        cellNumber = 100;
    } else if (gameLevel === 'medium'){
        cellNumber = 81;
    } else if (gameLevel === 'hard') {
        cellNumber = 64;
    }

    // DEFINISCO IL PUNTEGGIO INIZIALE
    let score = 0;

    // DEFINISCO IL NUMERO DI BOMBE
    const totalBombs = 16;

    // CALCOLO IL PUNTEGGIO MASSIMO
    const maxPoints = cellNumber - totalBombs;

    // CREO LA FUNZIONE PER CREARE LE BOMBE
    function createBombs(totalBombs, cellNumber){
        const bombs = []

        while (bombs.length < totalBombs){
          let randomNumber;
          do { 
            randomNumber = Math.floor(Math.random() * cellNumber) + 1;
        } while (bombs.includes(randomNumber));
        bombs.push(randomNumber);
        }

        return bombs;
    }

    // MOSTRO IL MESSAGGIO DI FINE PARTITA
    function gameOver(score, hasWon){
        const cells = document.querySelectorAll('.cell');

        for (let i = 1; i < cells.length; i++){
            cells[i].classList.add('clicked');
        }

        let message = '';
        if (hasWon){
            message = 'Complimenti hai vinto! Il tuo punteggio è ' + score;
        } else{
            message = 'Mi dispiace hai perso, il tuo punteggio è ' + score;
        }

        console.log(message);
    }

    // RECUPERO LA GRIGLIA
    const grid = document.getElementById('grid');

    grid.innerHTML = '';

    // CREO CELLA
    function createCell(cellNumber){
        const cell = document.createElement('div');
        cell.classList.add("cell", gameLevel)
        cell.innerText = cellNumber;

        return cell;
    }

    // EVOCO LA FUNZIONE PER CREARE LE BOMBE 
    const bombs = createBombs(totalBombs, cellNumber)
    console.log(bombs);

    for (let i = 1; i <= cellNumber; i++){
        const cell = createCell(i);

        // AGGIUNGO LA CLASSE CLICKED
        cell.addEventListener('click', function(){
            // SE HA GIA' LA CLASSE CLICKED NON PROCEDERE
            if(cell.classList.contains('clicked')){
                return;
            }

            // cell.classList.add('clicked')

            let cellInnerText = i;
            console.log(cellInnerText);

            // CONTROLLO SE HO BECCATO UNA BOMBA
            if(bombs.includes(parseInt(cellInnerText))){
                cell.classList.add('explode')
                gameOver(score, false)
            } else {
                cell.classList.add('safe')
                score++;
                if(score - 1 == maxPoints){
                    gameOver(maxPoints, true)
                }
            }

            console.log(score);
        })

        grid.appendChild(cell);
    }


}

// AGGANCIO L'EVENT LISTENER
playButton.addEventListener('click', play);