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
    Xwin = -1,
    Draw = 0,
    Owin = 1
}

export enum GameState {
    Upcoming = 0,
    InPlay = 1,
    Finished = 2
}