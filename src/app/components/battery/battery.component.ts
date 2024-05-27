import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Skill} from "../../models/skill.model";

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss']
})
export class BatteryComponent {
  public skillLevel: number = 0;
  public levels: string[] = ['Novice', 'Intermediate', 'Advanced', 'Expert'];
  @Input() skill: string = '';
  @Output() skillUpdateEvent = new EventEmitter<Skill>();

  public updateSkill(level: number) {
    if (this.skillLevel === 1 && level === 1) {
      this.skillLevel = 0;
    } else {
      this.skillLevel = level;
    }
    this.skillUpdateEvent.emit({
      name: this.skill,
      level: this.skillLevel ? this.levels[this.skillLevel - 1] : undefined
    })
  }
}
