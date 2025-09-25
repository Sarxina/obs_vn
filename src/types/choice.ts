export type ChoiceList = Choice[];

export interface Choice {
    text: string
    voteCommand: string
    voteCount: number
}
