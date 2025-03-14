import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { request } from "graphql-request";
import { IQuizResponse, TSavedAnswer } from "../types/quiz";
import styles from "../styles/Quiz.module.css";

export default function Quiz() {
  const router = useRouter();
  const Ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timer, setTimer] = useState("00:10:00");

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: Date) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e: Date) => {
    setTimer("00:10:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime: () => Date = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 600);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const [pageIndex, setPageIndex] = useState(0);
  const [answered, setAnswered] = useState<TSavedAnswer>({});

  const GET_QUIZ = /* GraphQL */ `
    query quizByIndex($idx: Int) {
      quiz: quizPaginated(idx: $idx) {
        _id
        question
        options
        answer
      }
    }
  `;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql";

  const { data, error } = useSWR<IQuizResponse>(
    [GET_QUIZ, pageIndex], 
    async ([query, idx]) => {
      try {
        const result = await request(API_URL, query, { idx });
        return result as IQuizResponse;
      } catch (err) {
        console.error("GraphQL Error:", err);
        throw err;
      }
    }
  );

  if (error) {
    return (
      <div className={styles.info}>
        <h2>{timer}</h2>
        <h3>Failed to load</h3>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.info}>
        <h2>{timer}</h2>
        <h3>Loading...</h3>
      </div>
    );
  }

  let prev = false;
  let next = false;

  if (data?.quiz) {
    prev = pageIndex !== 0;
    next = pageIndex !== 19;
  }

  const { quiz } = data;

  const addAnswer = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const latestAnswers = { ...answered, [name]: value };
    setAnswered(latestAnswers);
    window.localStorage.setItem("quiz", JSON.stringify(latestAnswers));
  };

  if (timer === "00:00:00") {
    router.push("/result");
  }

  return (
    data?.quiz && (
      <>
        <div className={styles.info}>
          <h2>{timer}</h2>
          <p>{pageIndex + 1} of 20</p>
        </div>
        <div>
          <div key={pageIndex}>
            <p>{quiz.question}</p>
          </div>
          <ul>
            {quiz.options.map((option: string, i: number) => (
              <li className={styles.option} key={i}>
                <label>
                  <input
                    type="radio"
                    name={quiz._id.toString()}
                    onChange={(e) => addAnswer(e)}
                    value={option}
                    checked={answered[quiz._id] === option}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.navBtns}>
          {prev ? (
            <button onClick={() => setPageIndex(pageIndex - 1)}>
              Previous Question
            </button>
          ) : (
            <Link href="/">
              Cancel
            </Link>
          )}
          {next ? (
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={answered[quiz._id] === undefined}
              className={
                answered[quiz._id] === undefined ? "disabledBtn" : "activeBtn"
              }
            >
              Next Question
            </button>
          ) : (
            answered[quiz._id] !== undefined && (
              <Link href="/result">
                <a className={styles.finish}>Finish</a>
              </Link>
            )
          )}
        </div>
      </>
    )
  );
}
