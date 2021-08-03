/* tslint:disable:no-any */
import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  showSuccess(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.next(this.toasts.getValue().concat({ textOrTpl, ...{classname: 'bg-success text-light', ...options }}));
  }

  showError(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.next(this.toasts.getValue().concat({ textOrTpl, ...{classname: 'bg-danger text-light', ...options }}));
  }

  remove(toast: any): void {
    this.toasts.next(this.toasts.getValue().filter(t => t !== toast));
  }
}
