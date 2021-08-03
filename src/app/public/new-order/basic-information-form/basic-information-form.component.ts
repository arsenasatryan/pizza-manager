import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss']
})
export class BasicInformationFormComponent implements OnInit {
  public contactForm!: FormGroup;

  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.contactForm = this.controlContainer.control as FormGroup;
  }

}
