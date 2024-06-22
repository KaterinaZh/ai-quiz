import {Component, OnInit} from '@angular/core';
import {Skill} from "../../models/skill.model";
import {QuizService} from "../../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isLoading: boolean = false;
  public skills: Skill[] = [];
  public buttonAvailable: boolean = false;

  constructor(private quizService: QuizService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.skills = this.quizService.skills;
  }

  updateSkill(res: Skill) {
    this.skills.forEach(skill => {
      if (skill.name === res.name) {
        skill.level = res.level;
      }
    });
    this.buttonAvailable = this.skills.findIndex(s => s.level !== undefined) !== -1;
  }

  generateQuiz() {
    this.isLoading = true;
    this.buttonAvailable = false;
    const skillsToSend: Skill[] = this.skills.filter(s => s.level !== undefined);
    this.quizService.generateQuiz(skillsToSend).subscribe(({ id }) => {
      this.isLoading = false;
      this.router.navigate(['/quiz/' + id]);
    });
  }
}
