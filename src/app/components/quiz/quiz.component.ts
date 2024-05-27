import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Question, QuizTheme, SolvedQuestion} from "../../models/quiz.model";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public quizTheme: QuizTheme[] = [];
  public isLoading: boolean = false;
  public notAnsweredQuestion: Question | undefined;
  public submitted: boolean = false;
  public questionsAmount: number = 0;
  public correctAnswersAmount: number = 0;
  public correctAnswersPercent: number = 0;
  public submitDate = new Date();
  private quizId: number = 0;

  constructor(private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.quizId = this.route.snapshot.params['id'];
    this.quizService.getQuiz(this.quizId).subscribe(res => {
      this.questionsAmount = res.length;
      res.forEach(q => {
        const hasSkill = this.quizTheme.find(t => t.skill === q.skill);
        if (hasSkill) {
          hasSkill.questions.push(q);
        } else {
          this.quizTheme.push({skill: q.skill, questions: [q]})
        }
      });
      this.notAnsweredQuestion = this.quizTheme[0].questions[0];
      this.isLoading = false;
    });
  }

  public back() {
    this.router.navigate(['/']);
  }

  public onSubmit() {
    if (this.notAnsweredQuestion) {
      this.goTo(`question-${this.notAnsweredQuestion.id}`, true);
    } else {
      this.postAnsweredQuiz();
    }
  }

  public chooseOption() {
    let q = this.quizTheme.map(t => {
      return t.questions;
    }).flat();
    this.notAnsweredQuestion = q.find(i => !(i.options.findIndex(o => o.selected) > -1));
  }

  public loadReport() {
    const data: HTMLElement = this.formHtmlReport();
    this.buildPdfReport(data);
  }

  private goTo(elId: string, withBlink?: boolean) {
    const el = document.getElementById(elId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
      if (withBlink) {
        el.classList.add('blink');
        setTimeout(() => {
          el.classList.remove('blink');
        }, 1000);
      }
    }
  }

  private postAnsweredQuiz() {
    this.isLoading = true;
    let q: SolvedQuestion[] = this.quizTheme.map(t => {
      return t.questions;
    }).flat().map(q => {
      return {questionId: q.id, selected: q.options.findIndex(o => o.selected)}
    });
    console.log(q);
    this.correctAnswersAmount = 0;
    this.quizService.submitQuiz(q).subscribe(res => {
      this.quizTheme.map(qt => {
        let correctAnswers: number = 0;
        qt.questions.map(q => {
          const question = res.find(question => question.id === q.id);
          const index = question?.options.findIndex(o => o.isCorrect);
          if (index !== undefined && index > -1) {
            q.options[index].isCorrect = true;
            q.correctAnswer = q.options[index].selected;
            if (q.correctAnswer) {
              correctAnswers++;
            }
          }
        });
        qt.correctAnswers = correctAnswers;
        qt.percent = correctAnswers * 100 / qt.questions.length;
        this.correctAnswersAmount += qt.correctAnswers;
      });
      this.correctAnswersPercent = this.correctAnswersAmount * 100 / this.questionsAmount;
      this.submitted = true;
      this.isLoading = false;
      this.goTo('quiz');
    });
  }

  private formHtmlReport(): HTMLElement {
    return document.getElementById('quiz-report') || document.createElement("div");
  }

  private buildPdfReport(data: HTMLElement) {
    data.style.display = 'block';
    html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF('p', 'mm');
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(`AI_Quiz_${this.submitDate.toLocaleDateString()}.pdf`);
      data.style.display = 'none';
    });
  }
}
