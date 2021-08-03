import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../../services/toast-service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:no-any
  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }

  // tslint:disable-next-line:no-any
  get toasts(): BehaviorSubject<any[]> {
    return this.toastService.toasts;
  }

  // tslint:disable-next-line:no-any
  remove(item: any): void {
    this.toastService.remove(item);
  }

}
