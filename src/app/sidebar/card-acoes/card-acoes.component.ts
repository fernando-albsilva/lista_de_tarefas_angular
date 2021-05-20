import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-acoes',
  templateUrl: './card-acoes.component.html',
  styleUrls: ['./card-acoes.component.scss']
})
export class CardAcoesComponent implements OnInit {

  duracao_jornada = '00:00:00'
  duracao_intervalo = '00:00:00'

  constructor() { }

  ngOnInit(): void {
  }

}
