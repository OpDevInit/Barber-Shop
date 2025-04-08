import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, selectClientModel } from '../../../services/api-client/schedules/schedule.models';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-schedule-calendar',
  imports: [CommonModule, FormsModule, MatIconModule, MatFormFieldModule,
    MatTimepickerModule, MatInputModule, MatSelectModule, MatCardModule,
    MatDatepickerModule, MatTableModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: SERVICES_TOKEN.YES_NO_DIALOG, useClass: DialogManagerService }
  ]
})
export class ScheduleCalendarComponent implements AfterViewInit, OnChanges, OnInit {

  @Input() monthSchedule!: ScheduleAppointmentMonthModel
  @Input() clients: selectClientModel[] = []

  @Output() onDateChange = new EventEmitter<Date>();
  @Output() onConfirmDelete = new EventEmitter<ClientScheduleAppointmentModel>();
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _selected: Date = new Date();
  private subscription?: Subscription
  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions'];
  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>
  addingSchedule: boolean = false;
  newSchedule: SaveScheduleModel = { startAt: null!, endAt: null!, clientId: 0 };
  clientSelectFormControl = new FormControl()

  constructor(@Inject(SERVICES_TOKEN.YES_NO_DIALOG) private readonly dialogManagerService: IDialogManagerService) {

  }


  public get selected(): Date {
    return this._selected
  }
  public set selected(value: Date) {
    if (this._selected.getTime() !== value.getTime()) {
      this.onDateChange.emit(value);
      this.buildTable();
      this._selected = value;

    }
  }


  ngOnInit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()

    }
  }


  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable();
    }

  }
  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(this.newSchedule.startAt!.getHours(), this.newSchedule.startAt!.getMinutes());
    endAt.setHours(this.newSchedule.startAt!.getHours()+1, this.newSchedule.startAt!.getMinutes());

    const saved: ClientScheduleAppointmentModel = {
      id: -1,
      day: this._selected.getDate(),
      startAt: startAt,
      endAt: endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find(c => c.id === this.newSchedule.clientId)!.name
    };

    // ✅ Emite para componente pai
    this.onScheduleClient.emit(saved);

    // ✅ Atualiza a tabelas
    this.buildTable();

    // ✅ Limpa o formulário
    form.resetForm();

    this.newSchedule = { startAt: null!, endAt: null!, clientId: 0 };
  }


  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscription = this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      {
        title: 'Exclusão Do Agendamento',
        content: `Deseja realmente excluir o agendamento do cliente ${schedule.clientName} ?`,
      }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(schedule);
        const updatedList = this.dataSource.data.filter(a => a.id !== schedule.id);
        this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(updatedList);
      }
    })

  }
  onTimeChange(time: Date) {
    if (!time) return;

    // Define o horário de início
    this.newSchedule.startAt = time;

    // Cria uma nova data baseada no horário de início
    const endAt = new Date(time);
    endAt.setHours(time.getHours() + 1);

    // Define o horário de término
    this.newSchedule.endAt = endAt;

  }
  private buildTable() {
    // Confirma se temos agendamentos válidos
    const appointments = this.monthSchedule?.scheduleAppointments?.filter(a =>
      this.monthSchedule.year === this._selected.getFullYear() &&
      this.monthSchedule.month === this._selected.getMonth() +1
    );
    // Preenche o dataSource corretamente
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(appointments);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } console.log('🗓️ Dia selecionado:', appointments);
    console.log('📅 Agendamentos do mês:', this.monthSchedule?.scheduleAppointments);

  }
}

