import { Component, Input, OnInit } from '@angular/core';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-card-header-tarefa',
  templateUrl: './card-header-tarefa.component.html',
  styleUrls: ['./card-header-tarefa.component.scss']
})
export class CardHeaderTarefaComponent implements OnInit {

  @Input() icone = '';
  @Input() info: any;
  @Input() classe_green_bg: string[] = ["false"];

  classe_icone: string = '';
  classe_info: string = '';
  info_1 = '';
  info_2 = '';
  info_3 = '';

  constructor(private tarefaService: TarefaService) {
    this.escutaTarefaPendente();
  }

  ngOnInit(): void {
    this.info_1 = this.info[0];
    this.info_2 = this.info[1];
    this.info_3 = this.info[2];

    if (this.classe_green_bg[0] != "false") {
      this.classe_icone = "icon-containe-green";
      this.classe_info = "card-info-container-green";

    } else {
      this.classe_icone = "icon-container";
      this.classe_info = "card-info-container";
    }

    this.escutaTarefaPendente();
    this.escutaTarefaAtiva();
    this.escutaTarefaPausada();
    this.escutaTarefaDeletada();
    this.escutaTarefaFinalizada();
    this.escutaTarefaFinalizadaDeletada();
  }


  escutaTarefaPendente() {
    this.tarefaService.emitirTarefaPendente.subscribe(quantidadeTarefa => {
      this.info_1 = "Tarefas Pendentes: " + quantidadeTarefa.toString();
    });
  }
  
  escutaTarefaFinalizada() {

    this.tarefaService.emitirTarefaFinalizada.subscribe(() => {
      this.info_2 = "Tarefas Concluidas: " + this.tarefaService.listaDeTarefasConcluida.length;
    });
  }

  escutaTarefaAtiva() {
    this.tarefaService.emitirTarefaIniciada.subscribe(() => {
      this.info_3 = "Tarefas Ativas: 1";
    });
  }
  escutaTarefaPausada() {
    this.tarefaService.emitirTarefaPausada.subscribe(() => {
      this.info_3 = "Tarefas Ativas: 0";
    });
  }
  escutaTarefaDeletada() {
    this.tarefaService.emitirTarefaDeletada.subscribe( () => {
      this.info_3 = "Tarefas Ativas: 0";
    });
  }
  
  escutaTarefaFinalizadaDeletada(){
    this.tarefaService.emitirTarefaConcluidaDeletada.subscribe( () => {
      this.info_2 = "Tarefas Concluidas: " + this.tarefaService.listaDeTarefasConcluida.length;
    });
    
  }

}
