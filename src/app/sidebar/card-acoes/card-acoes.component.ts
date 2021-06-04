import { Component } from '@angular/core';

@Component({
  selector: 'app-card-acoes',
  templateUrl: './card-acoes.component.html',
  styleUrls: ['./card-acoes.component.scss']
})
export class CardAcoesComponent  {

  duracao_jornada:string = '00:00:00'
  duracao_intervalo:string = '00:00:00'

  constructor() { }

 
}
