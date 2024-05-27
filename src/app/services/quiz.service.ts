import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Skill} from "../models/skill.model";
import {delay, Observable, of} from "rxjs";
import {Question, SolvedQuestion} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public skills: Skill[] = [{name: 'HTML'}, {name: 'CSS'}, {name: 'JavaScript'}, {name: 'TypeScript'},
    {name: 'ReactJS'}, {name: 'Angular'}, {name: 'VueJS'}, {name: 'Node.js'}, {name: 'Cloud fundamentals'}];
  private readonly SKILLS = '/api/skills';
  private readonly QUIZ = '/api/quiz';
  private readonly QUIZ_FILE = 'assets/jsons/quiz.json';
  private readonly QUIZ_ANSWERS_FILE = 'assets/jsons/quiz answers.json';

  constructor(private http: HttpClient) {
  }

  public generateQuiz(skills: Skill[]): Observable<number> {
    return of(1);
    // TODO: add post request which returns id of quiz
    // return this.http.post(this.SKILLS, {
    //   skills
    // });
  }

  public getQuiz(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.QUIZ_FILE).pipe(delay(1000));
    // TODO: add get request which returns quiz by id
    // return this.http.get(`${this.QUIZ}/${id}`);
  }

  public submitQuiz(quiz: SolvedQuestion[]): Observable<Question[]> {
    return this.http.get<Question[]>(this.QUIZ_ANSWERS_FILE).pipe(delay(1000));
    // TODO: add get request which returns quiz by id
    // return this.http.post<Question[]>(this.QUIZ, {quiz});
  }
}
