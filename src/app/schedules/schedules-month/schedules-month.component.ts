import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from "../components/schedule-calendar/schedule-calendar.component";
import { SERVICES_TOKEN } from '../../services/service.token';
import { IScheduleService } from '../../services/api-client/schedules/ischedules.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, selectClientModel } from '../../services/api-client/schedules/schedule.models';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService },
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  private selectedDate?: Date

  monthSchedule!: ScheduleAppointmentMonthModel
  clients: selectClientModel[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpService: IScheduleService,
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly clientHttpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService) { }

  ngOnInit(): void {

    const currentDate = new Date();
    this.fetchSchedules(currentDate); // carrega agendamentos
    this.fetchClients();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
  onDateChange(date: Date) {
    this.selectedDate = date
    this.fetchSchedules(date)

  }

  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SaveScheduleModel = {
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        clientId: schedule.clientId
      }
      this.subscriptions.push(this.httpService.save(request)
        .subscribe(() => this.snackBarManager.show('Agendamento salvo com sucesso!')))
      if (this.selectedDate) {
        this.fetchSchedules(this.selectedDate)
        console.log(request)
      }
    }
  }
  confirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe())
  }

  private fetchClients(): void {
    this.subscriptions.push(
      this.clientHttpService.list().subscribe(data => {
        this.clients = data;
      })
    );
  }
  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(this.httpService.list(month, year).subscribe((data: ScheduleAppointmentMonthModel) => {
      const convertedAppointments = data.scheduleAppointments.map(a => ({
        ...a,
        startAt: new Date(a.startAt),
        endAt: new Date(a.endAt),
      }));

      this.monthSchedule = {
        ...data,
        scheduleAppointments: convertedAppointments
      };

      console.log("✅ Dados com datas convertidas:", this.monthSchedule);
    }));
    
  }

}
