import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Option} from "../../models/quiz.model";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Input() loading: boolean = false;
  @Input() submitted: boolean = false;
  @Input() questionId: number = 0;
  @Input() options: Option[] = [];
  @Output() optionChooseEvent = new EventEmitter();
  public letterOptions: string[] = ['A', 'B', 'C', 'D'];

  public select(index: number) {
    if (this.loading || this.submitted) return;
    this.options.map((o, i) =>
      o.selected = i === index
    );
    this.optionChooseEvent.emit();
  }
}
