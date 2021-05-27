import { Component, OnInit } from '@angular/core';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';

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
  intervaloTarefa: any;

  constructor(
    private tarefaService: TarefaService,
    private tarefa: TarefaModel
  ) { }

  ngOnInit(): void {
    this.escutaTarefaIniciada();
    this.escutaTarefaPausada();

  }

  escutaTarefaIniciada() {
    this.tarefaService.emitirTarefaIniciada.subscribe(
      tarefaIniciada => {
        this.tarefa = tarefaIniciada;
        this.setDataInfoCard();
        this.iniciaContagemTempoTarefa();
      });
  }
  escutaTarefaPausada() {
    this.tarefaService.emitirTarefaPausada.subscribe(
      indiceTarefaPausada => {
        this.pausaContagemTempoTarefa(indiceTarefaPausada);
      });

  }

  setDataInfoCard() {
    this.status = "Tarefa Inicada";
    this.nome_tarefa = this.tarefa.nomeTarefa;
    this.descricao_Tarefa = this.tarefa.descricao;
  }

  iniciaContagemTempoTarefa() {

    this.intervaloTarefa = setInterval(() => {

                            this.duracao_tarefa = this.calculaSubtracaoHoraMinSeg();

                          }, 1000);
  }


  calculaSubtracaoHoraMinSeg(): string {
    let data = new Date();
    let totalHoraMinSeg: number;
    let totalHoraMinSegTarefa: number;
    let totalSegDuracao: number;
    let totalHora: string;
    let totalMinuto: string;
    let totalSegundo: string;


    totalHoraMinSeg = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + (data.getSeconds());
    totalHoraMinSegTarefa = (this.tarefa.horaIncio * 60 * 60) + (this.tarefa.minutoInicio * 60) + (this.tarefa.segundoInicio);
    totalSegDuracao = totalHoraMinSeg - totalHoraMinSegTarefa;
    totalHora = (Math.round(totalSegDuracao / 3600)).toString();
    totalMinuto = (Math.round((totalSegDuracao % 3600) / 60)).toString();
    totalSegundo = (Math.round((totalSegDuracao % 3600) % 60)).toString();

    if (parseInt(totalHora) <= 9) { totalHora = "0" + totalHora }
    if (parseInt(totalMinuto) <= 9) { totalMinuto = "0" + totalMinuto }
    if (parseInt(totalSegundo) <= 9) { totalSegundo = "0" + totalSegundo }

    return (totalHora + ":" + totalMinuto + ":" + totalSegundo);

  }

  pausaContagemTempoTarefa(indice: string) {

    if (this.tarefa.id === indice) {
      clearInterval(this.intervaloTarefa); 
    }

  }
}