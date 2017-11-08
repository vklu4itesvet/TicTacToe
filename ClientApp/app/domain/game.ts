import { GameStep, PlayerType, GameState, GameResult } from './game.data';

export class Game {
    static readonly sheetSize = 3;

    playerXname = PlayerType[PlayerType.X];

    playerOname = PlayerType[PlayerType.O];

    stepBy = PlayerType.X;

    result?: string;

    state = GameState.Upcoming;

    xSteps = new Array<GameStep>();

    oSteps = new Array<GameStep>();

    onGameOver: (result: string) => void

    tryMakeStep(r: number, c: number) { 
        if (!this.stepIsAllowed(r, c)) {
            return false;
        }

        if (this.checkIsOver(this.saveStep(r, c))) {
            this.onGameOver(this.result ? this.result : '');
        }
        else {
            this.stepBy = this.stepBy * (-1);//switching current player
        }

        return true;
    }

    stepIsAllowed(r: number, c: number) {
        if (this.state === GameState.Finished) {
            return false;
        }

        let suchXisEmpty = !this.xSteps.some(s => s.r == r && s.c == c);
        let suchOisEmpty = !this.oSteps.some(s => s.r == r && s.c == c);

        return suchXisEmpty && suchOisEmpty;
    }

    checkIsOver(bySteps: Array<GameStep>) {
        // check for draw case
        if (bySteps.length == 5) {
            this.result = GameResult[GameResult.Draw];
        }

        //checking for diagonal cases
        let distinctByVectorSteps = this.getDistinctByVector(bySteps);
        let diagSign1 = distinctByVectorSteps.length === 1;
        let diagSign2 = distinctByVectorSteps.length === 3;

        if (bySteps.filter(s => s.vector % 2 == 0).length == 3
            && (diagSign1 || diagSign2)) {
            this.result = GameResult[this.stepBy];
        }

        for (let i = 1; i <= Game.sheetSize; i++) {
            // check for horisontal case
            if (bySteps.filter(s => s.c == i).length == 3) {
                this.result = GameResult[this.stepBy];
            }

            // check for vertical case
            if (bySteps.filter(s => s.r == i).length == 3) {
                this.result = GameResult[this.stepBy];
            }
        }

        this.state = this.result === undefined ? GameState.InPlay : GameState.Finished;

        return this.state == GameState.Finished;
    }

    saveStep(r: number, c: number) {
        let stepInto = this.stepBy == PlayerType.X ? this.xSteps : this.oSteps;
        stepInto.push(new GameStep(r, c));

        return stepInto;
    }

    getDistinctByVector(inArray: Array<GameStep>) {
        return inArray.filter(function (item, index) {
            return inArray.findIndex(i => i.vector === item.vector) == index;
        });
    }
}