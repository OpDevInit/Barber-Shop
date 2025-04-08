import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { ClientModelForm } from '../client.models';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class EditClientComponent implements OnInit, OnDestroy {

  private httpSubscriptions?: Subscription[] = []


  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router) {
  }
  client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  ngOnInit(): void {

    //agregando valor a variavel de acordo com o parametro da rota    
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do CLIENTE')
      this.router.navigate(['clients/list'])
      return
    }
    this.httpSubscriptions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data));

  }
  ngOnDestroy(): void {
    this.httpSubscriptions?.forEach(s => s.unsubscribe)
  }

  onSubmitClient(value: ClientModelForm) {
    //objeto desestruturado:
    //id = value.id
    //request = novo objeto feito dos restantes atributos de value
    const { id, ...request } = value

    if (id) {
      this.httpSubscriptions?.push(this.httpService.update(id, request).subscribe(_ => {
        this.snackBarManager.show('Usuário Atualizado Com Sucesso')
        this.router.navigate(['clients/list'])
      }))
      return
    }
    this.snackBarManager.show('Um erro inesperado aconteceu')
    this.router.navigate(['clients/list'])
  }
}
