import { Observable } from "rxjs";
import { SaveScheduleModel, ScheduleAppointmentMonthModel } from "./schedule.models";

export interface IScheduleService {

  save(request: SaveScheduleModel): Observable<SaveScheduleModel>;

  delete(id: number): Observable<void>;

  list(month: number, year: number): Observable<ScheduleAppointmentMonthModel>;

  
  
}