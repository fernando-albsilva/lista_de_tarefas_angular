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
  intervaloTarefa: any = null;
  totalHora: string='';
  totalMinuto: string='';
  totalSegundo: string='';
  textColor:string= '';
  // statusId:string= '';

  constructor(
    private tarefaService: TarefaService,
    private tarefa: TarefaModel
  ) { }

  ngOnInit(): void {
    this.escutaTarefaIniciada();
    this.escutaTarefaPausada();
    this.escutaTarefaDeletada();
    this.escutaTarefaFinalizada();
    this.escutaTarefaEditada();
  }

  escutaTarefaIniciada() {
   
    this.tarefaService.emitirTarefaIniciada.subscribe(
      (tarefaIniciada:TarefaModel) => {
       
        if(this.intervaloTarefa !== null){
          this.pausaContagemTempoTarefa();
        }
        this.tarefa = new TarefaModel();
        this.tarefa = tarefaIniciada;
        this.setDataInfoCard("Tarefa Iniciada");
        this.iniciaContagemTempoTarefa();
      });
  }

  escutaTarefaPausada() {
    this.tarefaService.emitirTarefaPausada.subscribe(
      () => {
        this.pausaContagemTempoTarefa();
      });

  }

  escutaTarefaEditada() {
    //TODO aqui emitir um snack bar com tarefa Editada
    // this.tarefaService.emitirTarefaEditada.subscribe(
    //   () => {
    //     setTimeout ( ()=>{
    //       this.setDataInfoCard("Tarefa Editada");
    //     },300);
    //   });

  }

  escutaTarefaDeletada() {
    this.tarefaService.emitirTarefaDeletada.subscribe(
      tarefaDeletada => {
        this.pausaContagemTempoTarefa();
        this.tarefa = tarefaDeletada;
        this.setDataInfoCard("Tarefa Excluida");
        setTimeout(()=>{this.tarefa=new TarefaModel()},100);
      });

  }

  escutaTarefaFinalizada() {
    this.tarefaService.emitirTarefaFinalizada.subscribe(
      (tarefaFinalizada) => {
        this.pausaContagemTempoTarefa();
        setTimeout(()=>{
        this.tarefa= tarefaFinalizada;
        this.setDataInfoCard("Tarefa Finalizada");
        this.tarefa=new TarefaModel()},300);
      });
  }

  setDataInfoCard(status:string) {
    this.status = status;
    if (status === "Tarefa Finalizada") { this.textColor = "blue";}
    if (status === "Tarefa Excluida")   { this.textColor = "red";}
    if (status === "Tarefa Iniciada")   { this.textColor = "statusIniciada";}
    if (status === "Tarefa Editada")   { this.textColor = "orange";}

    this.nome_tarefa = this.tarefa.nomeTarefa;
    this.duracao_tarefa = this.tarefa.duracao;
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

    this.tarefa.duracao=this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo;
    
    return (this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo);

  }

  pausaContagemTempoTarefa() {

    this.status= "Tarefa Pausada";
    this.textColor = "yellow";
    let data = new Date();
    // if (this.tarefa.id === indice) {
      this.limpaSetInteval();
      setTimeout(()=>{this.tarefaService.registraTempoTarefaAtiva((data.getHours()),(data.getMinutes()),(data.getSeconds()),this.tarefa.id)},100);

    // }

  }
 
  limpaSetInteval(){
    clearInterval(this.intervaloTarefa); 
  }

}