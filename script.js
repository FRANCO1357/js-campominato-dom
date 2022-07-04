// RECUPERO IL BOTTONE
const playButton = document.getElementById('play');

// FUNZIONE PER INIZIAREIL GIOCO
function play(){
    this.innerText = 'Ricomincia!';

    // RECUPERO LA GRIGLIA
    const grid = document.getElementById('grid');

    grid.innerHTML = '';

    const level = document.getElementById('level');
    let gameLevel = level.value;
    console.log(gameLevel);

    if (gameLevel === 'easy'){
        cellNumber = 100;
    } else if (gameLevel === 'medium'){
        cellNumber = 81;
    } else if (gameLevel === 'hard') {
        cellNumber = 64;
    }
    

    // CREO CELLA
    function createCell(cellNumber){
        const cell = document.createElement('div');
        cell.classList.add("cell", gameLevel)
        cell.innerText = cellNumber;

        return cell;
    }

    for (let i = 1; i <= cellNumber; i++){
        const cell = createCell(i);

        cell.addEventListener('click', function(){
            if(cell.classList.contains('clicked')){
                return;
            }

            console.log(i);
            cell.classList.add('clicked');
        })

        grid.appendChild(cell);
    }


}

// AGGANCIO L'EVENT LISTENER
playButton.addEventListener('click', play);