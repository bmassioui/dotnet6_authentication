import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subjectAlert = new Subject<Alert>()
  private defaultId: string = 'default-alert'

  /**
   * Enable subscripting to alerts observable
   * @param id 
   */
  onAlert(id: string = this.defaultId): Observable<Alert> {
    return this.subjectAlert.asObservable()
      .pipe(
        filter(x => x && x.id === id)
      )
  }

  /**
   * Convenience methods
   * @param message 
   * @param options 
   */
  success(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }))
  }

  /**
   * 
   * @param message 
   * @param options 
   */
  error(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }))
  }

  /**
   * 
   * @param message 
   * @param options 
   */
  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }))
  }

  /**
   * 
   * @param message 
   * @param options 
   */
  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }))
  }

  /**
   * Alert Main method
   * @param alert 
   * @param options 
   */
  alert(alert: Alert, options?: any) {
    alert.id = alert.id || this.defaultId

    this.subjectAlert.next(alert)
  }

  /**
   * Clear alerts
   * @param id 
   */
  clear(id = this.defaultId){
    this.subjectAlert.next(new Alert({id}))
  }
}
