import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Skill} from "../models/skill.model";
import {delay, map, Observable, of} from "rxjs";
import {Question, SolvedQuestion} from "../models/quiz.model";

const API_ROOT = '/api/';

type QuizCreatedDTO = {
  id: string;
  status: string;
}

type AnswerDTO = {
  id: string;
  body: string;
  isCorrect: boolean;
}

type QuestionDTO = {
  answers: AnswerDTO[];
  id: string;
  level: string;
  question: string;
  topic: string;
}

type QuizDTO = {
  quiz: {
    id: string;
    questions: QuestionDTO[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public skills: Skill[] = [{name: 'HTML'}, {name: 'CSS'}, {name: 'JavaScript'}, {name: 'TypeScript'},
    {name: 'ReactJS'}, {name: 'Angular'}, {name: 'VueJS'}, {name: 'Node.js'}, {name: 'Cloud fundamentals'}];
  private readonly SKILLS = `${API_ROOT}quiz/generate`;
  private readonly QUIZ = `${API_ROOT}quiz`;
  private readonly QUIZ_FILE = 'assets/jsons/quiz.json';
  private readonly QUIZ_ANSWERS_FILE = 'assets/jsons/quiz answers.json';

  constructor(private http: HttpClient) {
  }

  private convertQuizDTOToQuiz(quizDTO: QuizDTO) {
    return quizDTO.quiz.questions.map((question) => ({
      id: question.id,
      skill: question.topic,
      question: question.question,
      options: question.answers.map((answer) => ({
        text: answer.body,
        id: answer.id,
        isCorrect: answer.isCorrect || undefined,
      }))
    }))
  }

  public generateQuiz(topics: Skill[]): Observable<QuizCreatedDTO> {
    return this.http.post<QuizCreatedDTO>(this.SKILLS, {
      topics,
    });
  }

  public getQuiz(id: string): Observable<Question[]> {
    return this.http.get<QuizDTO>(`${this.QUIZ}/${id}`).pipe(map((response) => this.convertQuizDTOToQuiz(response)));
  }

  public submitQuiz(id: string, quiz: SolvedQuestion[]): Observable<Question[]> {
    console.log(quiz, 'SOLVED QUESTIONS');

    const answers = Object.fromEntries(quiz.map(({ questionId, selected }) => [questionId, selected]));

    return this.http.post<QuizDTO>(`${this.QUIZ}/${id}`, { answers }).pipe(map((response) => this.convertQuizDTOToQuiz(response)));
  }
}
