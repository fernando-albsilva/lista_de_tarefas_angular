import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-informacoes-tarefa',
  templateUrl: './modal-informacoes-tarefa.component.html',
  styleUrls: ['./modal-informacoes-tarefa.scss']
})
export class ModalInformacoesTarefa implements OnInit {

  @Input() tarefa :any;
 
  nome_tarefa = 'Sem tarefa selecionada';
  prioridade_tarefa = 'Sem prioridade';
  descricao_Tarefa = 'Sem descrição';
  constructor() {
    
  }
  
  ngOnInit(): void {
   
    this.nome_tarefa=this.tarefa.nome_tarefa;
    this.prioridade_tarefa=this.tarefa.prioridade;
    this.descricao_Tarefa=this.tarefa.descricao;
  }

}
