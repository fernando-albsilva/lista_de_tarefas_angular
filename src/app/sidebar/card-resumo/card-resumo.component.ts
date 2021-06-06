import { Component, OnInit } from '@angular/core';
import { JornadaModel } from 'src/app/model/JornadaModel';
import { JornadaService } from 'src/app/services/jornada.service';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-card-resumo',
  templateUrl: './card-resumo.component.html',
  styleUrls: ['./card-resumo.component.scss']
})
export class CardResumoComponent implements OnInit {

  infoJornada = "Total Jornadas: 0";
  infoIntervalo = "Total Intervalos: 0";
  infoTarefaConcluida = "Total Tarefas Concluidas: 0";
  constructor(private jornadaService: JornadaService,
              private tarefaService:TarefaService) { }

  ngOnInit(): void {
    this.escutaJornadaFinalizada();
    this.escutaIntervaloFinalizado();
    this.escutaRegistroDeletado();
    this.escutaTarefaFinalizada();
    this.escutaTarefaFinalizadaDeletada();

    
  }

  escutaJornadaFinalizada() {
    this.jornadaService.emitirJornadaFinalizada.subscribe(() => {
        this.atualizaInfoJornada();
    });
  }

  escutaIntervaloFinalizado() {
    this.jornadaService.emitirIntervaloFinalizado.subscribe(() => {
      this.atualizaInfoIntervalo();
    });
  }
 
  escutaRegistroDeletado() {
    this.jornadaService.emitirRegistroDeletado.subscribe(() => {
      this.atualizaInfoJornada();
      this.atualizaInfoIntervalo();
    });
  }

  escutaTarefaFinalizada(){
    this.tarefaService.emitirTarefaFinalizada.subscribe(()=>{
      this.atualizaInfoTarefaConcluida();
    });
  }

  escutaTarefaFinalizadaDeletada(){
    this.tarefaService.emitirTarefaConcluidaDeletada.subscribe(()=>{
      this.atualizaInfoTarefaConcluida();
    });
  }

  atualizaInfoJornada() {
    let totalJornada: number = 0;

    this.jornadaService.listaJornada.map((elemento: JornadaModel) => {
      if ((elemento.finalizada === true) && (elemento.tipo === "Jornada")) {
        totalJornada++;
      }
    });

      this.infoJornada = "Total Jornadas: " + totalJornada;
  
  }

  atualizaInfoIntervalo(){
    let TotalIntervalo: number = 0;

    this.jornadaService.listaJornada.map((elemento: JornadaModel) => {
      if ((elemento.finalizada === true) && (elemento.tipo === "Intervalo")) {
        TotalIntervalo++;
      }
    });

      this.infoIntervalo = "Total Intervalos: " + TotalIntervalo;
    
  }

  atualizaInfoTarefaConcluida(){
    
    this.infoTarefaConcluida = "Total Tarefas Concluidas: " + this.tarefaService.listaDeTarefasConcluida.length;

  }
}
