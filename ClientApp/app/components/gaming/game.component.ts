import { Component, OnInit } from '@angular/core';
import { Game} from '../../domain/game';
import { PlayerType, GameState } from '../../domain/game.data';

@Component({
    selector: 'home',
    templateUrl: './game.component.html'
})
export class GameComponent {

    playerType = PlayerType;

    gameState = GameState;

    game: Game;

    sheetItems: number[];

    ngOnInit() {
        this.setNewGame();
    }

    setNewGame() {
        this.sheetItems = [1,2,3]
        this.game = new Game();
        this.game.onGameOver = this.gameOver;
    }

    stepInGame(e: any) {
        let cell = e.target;
        cell.appendChild(document.createTextNode(PlayerType[this.game.stepBy])); 

        this.game.makeStep(cell.dataset.c*1, cell.dataset.r*1);
    }

    gameOver(result: string) {
        this.sheetItems = [];
        this.setNewGame();

        //TODO: pass result and time stamp to the history service
    }
}