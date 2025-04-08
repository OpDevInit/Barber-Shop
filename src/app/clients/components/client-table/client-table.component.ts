import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ClientModelTable } from '../../client.models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';
@Component({
  selector: 'app-client-table',
  imports: [MatIconModule, MatPaginatorModule, MatButtonModule, MatTooltipModule, MatTableModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [{ provide: SERVICES_TOKEN.YES_NO_DIALOG, useClass: DialogManagerService },
              {provide: MatPaginatorIntl, useClass: CustomPaginator}]        
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {


  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  @Input()
  clients: ClientModelTable[] = []

  @Output()
  confirmDelete = new EventEmitter<ClientModelTable>()

  @Output()
  confirmUpdate = new EventEmitter<ClientModelTable>()


  dataSource!: MatTableDataSource<ClientModelTable>
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']
  private dialogManagerServicesSubscriptions?: Subscription

  constructor(@Inject(SERVICES_TOKEN.YES_NO_DIALOG) private readonly dialogManager: IDialogManagerService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }
  //Este método é executado quando há mudanças nos valores das propriedades @Input().
  ngOnChanges(changes: SimpleChanges): void {
    //Aqui estamos verificando se:
    //A propriedade clients foi alterada(changes['clients']).
    //O valor atual de clients não é null ou undefined(this.clients).
    if (changes['clients'] && this.clients) {

      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients);
      if (this.paginator) {
        //faz a conexao dos dados "dataSource" com a tabela HTML'paginator'
        this.dataSource.paginator = this.paginator

      }
    }
  }
  ngOnDestroy(): void {
    if (this.dialogManagerServicesSubscriptions) {
      this.dialogManagerServicesSubscriptions.unsubscribe
    }
  }

  onUpdateClient(client: ClientModelTable) {
    this.confirmUpdate.emit(client)
  }
  onDeleteClient(client: ClientModelTable) {
    this.dialogManager.showYesNoDialog(
      YesNoDialogComponent, {
      title: 'Exclusao de cliente',
      content: `Deseja realmente excluir o cliente ${client.name}`
    }).subscribe((result) => {
      if (result) {
        this.confirmDelete.emit(client);
        const updatedList = this.dataSource.data.filter(c => c.id!== client.id);
        this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList);
      }
    })

  }
  formatPhone(phone: string) {
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)} - ${phone.substring(7)}`
  }

}
