import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-informacoes',
  templateUrl: './card-informacoes.component.html',
  styleUrls: ['./card-informacoes.component.scss']
})
export class CardInformacoesComponent implements OnInit {

  status = 'Sem status';
  nome_tarefa = 'Sem tarefa selecionada';
  duracao_tarefa = '00:00:00';
  descricao_Tarefa = 'Sem descrição';

  constructor() { }

  ngOnInit(): void {
  }

}
