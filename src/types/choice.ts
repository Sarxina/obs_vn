export type Choices = Choice[];

export interface Choice {
    text: string
    voteCommand: string
    voteCount: number
}
