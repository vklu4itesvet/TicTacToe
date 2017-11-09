import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Game } from '../../domain/game';
import { PlayerType, GameState, GameResult } from '../../domain/game.data';
import { GamesHistoryService } from '../../services/games.history.service';

@Component({
    selector: 'home',
    templateUrl: './game.component.html',
    styleUrls: ['../../../css/game.component.css']
})
export class GameComponent {

    playerType = PlayerType;

    gameState = GameState;

    game = new Game();

    sheetItems: number[] = [1, 2, 3];

    constructor(private _cdRef: ChangeDetectorRef, private historyService: GamesHistoryService) { }

    get gameResultsMap(): any {
        return { 'Xwin': `${this.playerXname} win!`, 'Draw': 'Draw!', 'Owin': `${this.playerOname} win!` };
    }

    get playerXname(): string {
        return this.game.playerXname;
    }
    set playerXname(thePlayerXname: string) {
        this.game.playerXname = thePlayerXname;
    }

    get playerOname(): string {
        return this.game.playerOname;
    }
    set playerOname(thePlayerOname: string) {
        this.game.playerOname = thePlayerOname;
    }

    ngOnInit() {
        this.initializeGame();
    }

    setNewGame() {
        this.resetGameSheet();
        this.initializeGame();
    }

    stepInGame(e: any) {
        let cell = e.target;
        let stepPosition = cell.parentElement.dataset;
        let stepBy = this.game.stepBy;

        if (this.game.tryMakeStep(stepPosition.c * 1, stepPosition.r * 1)) {
            cell.textContent = PlayerType[stepBy];
        } 
    }

    gameOver(xPlayerName: string, oPlayerName: string, result: string) {
        this.historyService.saveGame(xPlayerName, oPlayerName, result);
    }

    initializeGame() {
        this.game = new Game();
        this.game.onGameOver = this.gameOver;
    }

    resetGameSheet() {
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; ++i) {
            cells[i].textContent = '\xa0';
        }
    }
}