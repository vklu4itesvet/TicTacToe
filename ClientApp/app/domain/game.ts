import { GameStep, PlayerType, GameState, GameResult } from './game.data';

export class Game {
    static readonly sheetSize = 3;

    stepBy = PlayerType.X;

    result?: string;

    state = GameState.Upcoming;

    xSteps = new Array<GameStep>();

    oSteps = new Array<GameStep>();

    onGameOver: (result: string) => void

    makeStep(r: number, c: number) {
        this.state = GameState.InPlay;

        let stepInto = this.stepBy == PlayerType.X ? this.xSteps : this.oSteps;
        stepInto.push(new GameStep(r, c));

        let res = this.checkIsOver(stepInto);
        if (res != null) {
            this.state = GameState.Finished;
            this.result = res;
            this.onGameOver(res);
        }
        else {
            this.stepBy = this.stepBy * (-1);//switching current player
        }
    }

    checkIsOver(bySteps: Array<GameStep>) {
        //checking for diagonal cases
        if (bySteps.filter(s => s.vector % 2 == 0).length == 3) {
            return GameResult[this.stepBy];
        }

        for (let i = 1; i <= Game.sheetSize; i++) {
            // check for draw case
            if (bySteps.length >= 4) {
                return GameResult[GameResult.Draw];
            }

            // check for horisontal case
            if (bySteps.filter(s => s.c == i).length == 3) {
                return GameResult[this.stepBy];
            }

            // check for vertical case
            if (bySteps.filter(s => s.r == i).length == 3) {
                return GameResult[this.stepBy];
            }
        }

        return null;
    }
}