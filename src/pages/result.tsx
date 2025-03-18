import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { request, gql } from 'graphql-request';
import { TQuiz, TSavedAnswer, IQuizResponseArray } from "../types/quiz";
import styles from "../styles/Quiz.module.css";

export default function Result() {
  const router = useRouter();
  const getAnswers: string =
    typeof window !== "undefined" && localStorage.getItem("quiz") || JSON.stringify({});

  const answers: TSavedAnswer = JSON.parse(getAnswers);

  const QUERY = gql`
    {
      quiz {
        _id
        question
        options
        answer
      }
    }
  `;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql";
  const { data, error } = useSWR<IQuizResponseArray>(
    [QUERY],
    async ([query]) => {
      try {
        const result = await request(API_URL, query);
        return result as IQuizResponseArray;
      } catch (err) {
        console.error("GraphQL Error:", err);
        throw err;
      }
    }
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (Object.keys(answers).length === 0 && answers.constructor === Object) {
    router.push("/");
  }

  let correctAnswers = 0;
  if (data.quiz.length > 0) {
    data.quiz.map((quiz: TQuiz) => {
      if (quiz.answer === answers[quiz._id]) {
        correctAnswers = correctAnswers + 1;
      }
    });
  }

  return (
    <>
      <div className={styles.centered}>
        <Link href="/" className={styles.startBtn}>
          Retake
        </Link>
      </div>
      <h2>
        You answered {correctAnswers} questions correctly. You{" "}
        {correctAnswers > Number((data.quiz.length / 100) * 70) ? "Passed 😃" : "Failed 🥺"}{" "}
      </h2>
      <br />

      {data.quiz && data.quiz.map((quiz: TQuiz) => (
        <>
          <div key={quiz._id}>
            <p>{quiz.question}</p>
          </div>
          <ul className={styles.ul}>
            {quiz.options.map((option: string, i: number) => (
              <li className={styles.option} key={i}>
                {option === quiz.answer ? (
                  quiz.answer === answers[quiz._id] ? (
                    <span>{option} &nbsp; ✅</span>
                  ) : (
                    <span>{option}</span>
                  )
                ) : answers[quiz._id] === option ? (
                  <>
                    <s>{option}</s> &nbsp;❌
                  </>
                ) : (
                  <s>{option}</s>
                )}
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
}
