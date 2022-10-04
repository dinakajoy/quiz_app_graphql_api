import Quiz from "../schemas/quiz.model";

export const getQuizes = async () => {
  try {
    const quizes = await Quiz.find({});
    
    return quizes;
  } catch (err) {
    console.log(err);
  }
};

export const getQuizPaginated = async (index: number) => {
  try {
    const quizzes = await Quiz.find();

    return quizzes[index];
  } catch (err) {
    console.log(err);
  }
};
