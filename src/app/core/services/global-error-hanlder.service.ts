import {ErrorHandler, Inject, Injectable, PLATFORM_ID} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }

  handleError(error: Error): void {
    // log error somewhere
    // throw err; //uncomment if you do not want to catch error
    console.error(error);
  }
}
