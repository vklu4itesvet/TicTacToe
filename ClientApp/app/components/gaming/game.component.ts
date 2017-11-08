import { Component, OnInit } from '@angular/core';
import { Game } from '../../domain/game';
import { PlayerType, GameState, GameResult } from '../../domain/game.data';

@Component({
    selector: 'home',
    templateUrl: './game.component.html',
    styleUrls: ['../../../css/game.component.css']
})
export class GameComponent {

    playerType = PlayerType;

    gameState = GameState;

    game: Game;

    sheetItems: number[];

    gameResultsMap: any = { 'Xwin': 'X win!', 'Draw': 'Draw!', 'Owin': 'O win!' };

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
        let step = cell.parentElement.dataset;
        cell.textContent = PlayerType[this.game.stepBy];
        this.game.makeStep(step.c * 1, step.r * 1);
    }

    gameOver(result: string) {
        this.sheetItems = [];
        //TODO: pass result and time stamp to the history service
    }
}