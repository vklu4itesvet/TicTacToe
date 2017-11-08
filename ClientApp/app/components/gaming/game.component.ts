import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

    sheetItems: number[] = [1, 2, 3];

    gameResultsMap: any = { 'Xwin': 'X win!', 'Draw': 'Draw!', 'Owin': 'O win!' };

    constructor(private _cdRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.initializeGame();
    }

    setNewGame() {
        this.resetGameSheet();
        this.initializeGame();
    }

    stepInGame(e: any) {
        let cell = e.target;
        let step = cell.parentElement.dataset;
        cell.textContent = PlayerType[this.game.stepBy];
        this.game.makeStep(step.c * 1, step.r * 1);
    }

    gameOver(result: string) {
        //TODO: pass result and time stamp to the history service
    }

    initializeGame() {
        this.game = new Game();
        this.game.onGameOver = this.gameOver;
    }

    resetGameSheet() {
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; ++i) {
            cells[i].textContent = ' ';
        }
    }
}