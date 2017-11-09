import { Injectable } from '@angular/core';
import { GameHistory} from '../domain/game.history'

@Injectable()
export class GamesHistoryService {

    saveGame(xPlayerName: string, oPlayerName: string, result: string) {
        let game = new GameHistory(xPlayerName, oPlayerName, result, new Date());
    }

    gateGames(xPlayerName: string, oPlayerName: string): GameHistory[] {
        return new Array<GameHistory>();
    }
}