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
  totalHora: string='';
  totalMinuto: string='';
  totalSegundo: string='';

  constructor(
    private tarefaService: TarefaService,
    private tarefa: TarefaModel
  ) { }

  ngOnInit(): void {
    this.escutaTarefaIniciada();
    this.escutaTarefaPausada();
    this.escutaTarefaDeletada();

  }

  escutaTarefaIniciada() {
    this.tarefaService.emitirTarefaIniciada.subscribe(
      (tarefaIniciada:TarefaModel) => {
        this.tarefa = new TarefaModel();
        this.tarefa = tarefaIniciada;
        this.setDataInfoCard("Tarefa Iniciada");
        this.iniciaContagemTempoTarefa();
      });
  }

  escutaTarefaPausada() {
    this.tarefaService.emitirTarefaPausada.subscribe(
      indiceTarefaPausada => {
        this.pausaContagemTempoTarefa(indiceTarefaPausada);
      });

  }

  escutaTarefaDeletada() {
    this.tarefaService.emitirTarefaDeletada.subscribe(
      tarefaDeletada => {
        this.limpaSetInteval();
        this.tarefa = tarefaDeletada;
        this.setDataInfoCard("Tarefa Excluida");
        setTimeout(()=>{this.tarefa=new TarefaModel()},2000);
      });

  }

  setDataInfoCard(status:string) {
    this.status = status;
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


    totalHoraMinSeg = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + (data.getSeconds());
    totalHoraMinSegTarefa = (this.tarefa.horaIncio * 60 * 60) + (this.tarefa.minutoInicio * 60) + (this.tarefa.segundoInicio);
    totalSegDuracao = totalHoraMinSeg - totalHoraMinSegTarefa;

    this.totalHora = (Math.trunc(totalSegDuracao / 3600)).toString();
    console.log("calculoHora: " +totalSegDuracao / 3600 )


    this.totalMinuto = (Math.trunc((totalSegDuracao % 3600) / 60)).toString();
    console.log("calculoMin: " +((totalSegDuracao % 3600) / 60))

    this.totalSegundo = (Math.trunc((totalSegDuracao % 3600) % 60)).toString();
    console.log("calculoSeg" +((totalSegDuracao % 3600) % 60))
    console.log("-----------------------------");

    if (parseInt(this.totalHora) <= 9) { this.totalHora = "0" + this.totalHora }
    if (parseInt(this.totalMinuto) <= 9) { this.totalMinuto = "0" + this.totalMinuto }
    if (parseInt(this.totalSegundo) <= 9) { this.totalSegundo = "0" + this.totalSegundo }

    return (this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo);

  }

  pausaContagemTempoTarefa(indice: string) {


    let data = new Date();
    if (this.tarefa.id === indice) {
      this.limpaSetInteval();
      this.tarefaService.registraTempoTarefaAtiva((data.getHours()),(data.getMinutes()),(data.getSeconds()),this.tarefa.id);

    }

  }
 
  limpaSetInteval(){
    clearInterval(this.intervaloTarefa); 
  }

}