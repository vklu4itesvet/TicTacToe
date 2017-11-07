export class GameStep {
    vector: number;

    constructor(public r: number, public c: number) {
        this.vector = r + c;
    }
}

export enum PlayerType {
    X = -1,
    O = 1
}

export enum GameResult {
    X_win = -1,
    Draw = 0,
    O_win = 1
}

export enum GameState {
    Upcoming = 0,
    InPlay = 1,
    Finished = 2
}