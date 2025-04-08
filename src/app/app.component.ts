import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { CardHeaderComponent } from "./commons/components/card-header/card-header.component";
import { filter, map, Subscription } from 'rxjs';
import { MenuBarComponent } from "./commons/components/menu-bar/menu-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'barber-shop-ui';

  private routeSubscription?: Subscription

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {

  }
  //Percorre a árvore de rotas ativa, até chegar na ultima e retornar o título
  private getRouteTitle(route: ActivatedRoute): string {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild
    }
    return child.snapshot.data['title'] || 'Default Title'
  }

  ngOnInit(): void {
    //Emissor de eventos
    this.router.events.pipe(
      //filtrar os eventos somente depois da navegação 
      filter(event => event instanceof NavigationEnd),
      //Pegar o titulo
      map(() => this.getRouteTitle(this.activatedRoute))
      //atribuir o resultado da função para o atributo 
    ).subscribe(title => this.title= title)
  }
  ngOnDestroy(): void {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe
    }
  }
}
