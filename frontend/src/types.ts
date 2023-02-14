export interface User {
    id: string,
    email: string,
    challenger_records: Record[],
    opponent_records: Record[]
}

export interface Record {
    game_id: string,
    user_id: string,
    opponent_id: string,
    state: string[][],
    moves: number,
    winner: string
}