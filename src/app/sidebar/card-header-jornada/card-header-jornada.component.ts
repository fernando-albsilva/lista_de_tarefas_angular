import { Component, Input, OnInit } from '@angular/core';
import { JornadaService } from 'src/app/services/jornada.service';


@Component({
  selector: 'app-card-header-jornada',
  templateUrl: './card-header-jornada.component.html',
  styleUrls: ['./card-header-jornada.component.scss']
})
export class CardHeaderJornadaComponent implements OnInit {

  @Input() icone = '';
  @Input() info:any;
  @Input() classe_green_bg: string[]=["false"];

  classe_icone:string='';
  classe_info:string='';
  info_1='';
  info_2='';
  info_3='';

  constructor(private jornadaService:JornadaService) {
    // this.escutaTarefaPendente();
    this.escutaJornadaFinalizada();
    this.escutaIntervaloFinalizado();
    this.escutaRegistroDeletado();
  }
  
  ngOnInit(): void {
    this.info_1=this.info[0];
    this.info_2=this.info[1];
    this.info_3=this.info[2];
   
    if(this.classe_green_bg[0] != "false")
    {
      this.classe_icone="icon-containe-green";
      this.classe_info="card-info-container-green";
     
    }else{
      this.classe_icone="icon-container";
      this.classe_info="card-info-container";
    }
   
  }

  escutaJornadaFinalizada(){
    this.jornadaService.emitirJornadaFinalizada.subscribe((jornadaFinalizadaId:string) => {
     setTimeout(()=>this.insereDuracao("Jornada"),200);
  });
  }
 
  escutaIntervaloFinalizado(){
    this.jornadaService.emitirIntervaloFinalizado.subscribe((jornadaFinalizadaId:string) => {
     setTimeout(()=>this.insereDuracao("Intervalo"),200);
  });
  }
  escutaRegistroDeletado(){
    this.jornadaService.emitirRegistroDeletado.subscribe((registroId:string) => {
     setTimeout(()=>this.insereDuracao("Intervalo"),200);
     setTimeout(()=>this.insereDuracao("Jornada"),200);
  });
  }

  insereDuracao(tipo:string){
    let totalHoraTrabalhado:string;
    let totalHora:number = 0;
    let totalMinuto:number = 0;
    let totalSegundo:number = 0;

    if(tipo === "Jornada"){
      this.jornadaService.listaJornada.map((elemento)=>{
        if(elemento.tipo === "Jornada"){
          
          let str = elemento.duracao.split(":");
          totalHora += parseInt(str[0]);
          totalMinuto += parseInt(str[1]);
          totalSegundo += parseInt(str[2]);  
        } 
        
      });
      totalHoraTrabalhado= this.calculaDuracao(totalHora,totalMinuto,totalSegundo);
      
      this.info_2="Horas Trabalhadas: "+ totalHoraTrabalhado;
    }

    if(tipo === "Intervalo"){
      this.jornadaService.listaJornada.map((elemento)=>{
        if(elemento.tipo === "Intervalo"){
          
          let str = elemento.duracao.split(":");
          totalHora += parseInt(str[0]);
          totalMinuto += parseInt(str[1]);
          totalSegundo += parseInt(str[2]);  
        } 
        
      });
      totalHoraTrabalhado= this.calculaDuracao(totalHora,totalMinuto,totalSegundo);
      
      this.info_3="Horas Intervalo: "+ totalHoraTrabalhado;
    }

  }

  calculaDuracao(hora:number,minuto:number,segundo:number):string
  {

    let totaTempoEmSeg: number;
    let totalHora: string;
    let totalMinuto: string;
    let totalSegundo: string;
    let totalTempoStr:string;
    
    totaTempoEmSeg = (hora * 60 * 60) + (minuto * 60) + (segundo);
  
    // totalHora = ((Math.trunc((-1*(totaTempoEmSeg / 3600))))*-1).toString();
    totalHora = (Math.trunc(totaTempoEmSeg / 3600)).toString();

    // totalMinuto = ((Math.trunc((-1*(totaTempoEmSeg % 3600)) / 60))*-1).toString();
    totalMinuto = (Math.trunc((totaTempoEmSeg % 3600) / 60)).toString();

    // totalSegundo = ((Math.trunc((-1*(totaTempoEmSeg % 3600) % 60))*-1)).toString();
    totalSegundo = (Math.trunc((totaTempoEmSeg % 3600) % 60)).toString();

    if (parseInt(totalHora) <= 9) { totalHora = "0" + totalHora }
    if (parseInt(totalMinuto) <= 9) { totalMinuto = "0" + totalMinuto }
    if (parseInt(totalSegundo) <= 9) { totalSegundo = "0" + totalSegundo }

    totalTempoStr = totalHora + ":" + totalMinuto + ":" + totalSegundo;

    return totalTempoStr;
  }


  // calculaSubtracaoHoraMinSeg(): string {
  //   let data = new Date();
  //   let totalHoraMinSeg: number;
  //   let totalHoraMinSegTarefa: number;
  //   let totalSegDuracao: number;


  //   totalHoraMinSeg = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + (data.getSeconds());
  //   totalHoraMinSegTarefa = (this.jornada.horaIncio * 60 * 60) + (this.jornada.minutoInicio * 60) + (this.jornada.segundoInicio);
  //   totalSegDuracao = totalHoraMinSeg - totalHoraMinSegTarefa;

  //   this.totalHora = (Math.trunc(totalSegDuracao / 3600)).toString();

  //   this.totalMinuto = (Math.trunc((totalSegDuracao % 3600) / 60)).toString();

  //   this.totalSegundo = (Math.trunc((totalSegDuracao % 3600) % 60)).toString();

  //   if (parseInt(this.totalHora) <= 9) { this.totalHora = "0" + this.totalHora }
  //   if (parseInt(this.totalMinuto) <= 9) { this.totalMinuto = "0" + this.totalMinuto }
  //   if (parseInt(this.totalSegundo) <= 9) { this.totalSegundo = "0" + this.totalSegundo }

  //   this.jornada.duracao=this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo;
    
  //   return (this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo);

  // } 
  // escutaTarefaPendente(){
  //   this.tarefaService.emitirTarefaPendente.subscribe(quantidadeTarefa => {
  //     this.info_1="TarefasPendentes: "+ quantidadeTarefa.toString();
  // });
  // }
  
}
