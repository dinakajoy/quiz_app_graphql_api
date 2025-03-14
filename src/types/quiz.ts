export type TQuiz = {
  _id: string,
  question: string,
  options: string[],
  answer: string
}

export type TQuizResponse = {
  data: {
    prev: boolean,
    next: boolean,
    page: string,
    quiz: TQuiz,
    total: number
  } | TQuiz[]
}

export type TSavedAnswer = {
  [key: string]: string
}

export type IQuizResponse = {
  quiz: TQuiz,
}