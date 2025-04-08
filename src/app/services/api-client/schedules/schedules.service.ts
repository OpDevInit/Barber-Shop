import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.service';
import { Observable } from 'rxjs';
import { SaveScheduleModel, ScheduleAppointmentMonthModel } from './schedule.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService implements IScheduleService {

  private readonly basePath = environment.apiUrl

  constructor(private http: HttpClient) { }

  save(request: SaveScheduleModel): Observable<SaveScheduleModel> {
    return this.http.post<SaveScheduleModel>(`${this.basePath}schedules`, request)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${id}`)
  }
  list(month: number, year: number): Observable<ScheduleAppointmentMonthModel> {
    return this.http.get<ScheduleAppointmentMonthModel>(`${this.basePath}schedules/${month}/${year}`)
  }

}
