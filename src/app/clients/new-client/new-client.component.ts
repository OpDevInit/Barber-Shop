import { Component, Inject, OnDestroy } from '@angular/core';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    {provide : SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService}
  ]
})
export class NewClientComponent implements OnDestroy {

  private httpSubscription?: Subscription

  //Injeção do token"SERVICE_TOKEN" com suas interfaces
  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
              @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager:ISnackbarManagerService,
              private readonly router:Router )
  {
  }
  ngOnDestroy(): void {
    if(this.httpSubscription){
      this.httpSubscription.unsubscribe()
    }
  }
  onSubmitClient(value: ClientModelForm) {
    console.log(value)
    const { id, ...request } = value
    this.httpSubscription = this.httpService.save(request).subscribe(_=>{
    this.snackBarManager.show('Usuário Cadastrado com Sucesso')

    // redirecionamento de página após salvar
    this.router.navigate(['clients/list'])
    })
  }
}
