import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { JornadaModel } from 'src/app/model/JornadaModel';
import { JornadaService } from 'src/app/services/jornada.service';

@Component({
  selector: 'app-card-acoes',
  templateUrl: './card-acoes.component.html',
  styleUrls: ['./card-acoes.component.scss']
})
export class CardAcoesComponent implements OnInit {
  btn_iniciarJornada:string = 'false';
  btn_finalizarJornada:string = 'false';
  btn_iniciarIntervalo:string = 'false';
  btn_finalizarIntervalo:string = 'false';

  duracao_jornada:string = '00:00:00'
  duracao_intervalo:string = '00:00:00'
  jornada:JornadaModel = new JornadaModel();
  intervaloJornada:any;
  totalHora: string='';
  totalMinuto: string='';
  totalSegundo: string='';

  constructor(private jornadaService: JornadaService) { }

  ngOnInit() {

    this.escutaJornadaIniciada();
    this.escutaJornadaFinalizada();
    this.escutaIntervaloIniciado();
    this.escutaIntervaloFinalizado();
   
  }

  escutaJornadaIniciada(){
    this.jornadaService.emitirJornadaIniciada.subscribe((jornadaId:string)=>{
        if(jornadaId === this.jornada.id)
        {
          if(this.jornada.tipo === "Jornada")
          {

            this.btn_iniciarJornada='true';
            this.btn_iniciarIntervalo='true';
            this.btn_finalizarIntervalo='true';
          }
          else{
            this.btn_iniciarJornada='true';
            this.btn_finalizarJornada='true';
            this.btn_iniciarIntervalo='true';
          }
            this.intervaloJornada = setInterval(() => {

              this.duracao_jornada = this.calculaSubtracaoHoraMinSeg();

            }, 1000);
          


        }
    });
  }

  escutaJornadaFinalizada(){
    this.jornadaService.emitirJornadaFinalizada.subscribe((jornafaFinalizadaId:string)=>{
      if(jornafaFinalizadaId=== this.jornada.id)
      {
        clearInterval(this.intervaloJornada);
        setTimeout(()=>{
          this.jornada = new JornadaModel();
          this.btn_iniciarJornada='false';
          this.btn_iniciarIntervalo='false';
          this.btn_finalizarIntervalo='false';
          this.duracao_jornada = "00:00:00";
        },100);
      }
    });
  }

  escutaIntervaloIniciado(){
    this.jornadaService.emitirIntervaloIniciado.subscribe((jornadaId:string)=>{
        if(jornadaId === this.jornada.id)
        {
          if(this.jornada.tipo === "Jornada")
          {

            this.btn_iniciarJornada='true';
            this.btn_iniciarIntervalo='true';
            this.btn_finalizarIntervalo='true';
          }
          else{
            this.btn_iniciarJornada='true';
            this.btn_finalizarJornada='true';
            this.btn_iniciarIntervalo='true';
          }
            this.intervaloJornada = setInterval(() => {

              this.duracao_intervalo = this.calculaSubtracaoHoraMinSeg();

            }, 1000);
          


        }
    });
  }

  escutaIntervaloFinalizado(){
    this.jornadaService.emitirIntervaloFinalizado.subscribe((jornafaFinalizadaId:string)=>{
     
      if(jornafaFinalizadaId=== this.jornada.id)
      {
        clearInterval(this.intervaloJornada);
        setTimeout(()=>{
          this.jornada = new JornadaModel();
          this.btn_iniciarJornada='false';
            this.btn_finalizarJornada='false';
            this.btn_iniciarIntervalo='false';
            this.duracao_intervalo = "00:00:00";
        },100);
      }
    });
  }

  iniciarJornada(){
    this.jornadaService.iniciarJornada(this.inicializaTempo("Jornada"));
  }
  finalizarJornada(){
    this.jornadaService.finalizarJornada(this.finalizarTempoJornada());
  }

  iniciarIntervalo(){
    this.jornadaService.iniciarIntervalo(this.inicializaTempo("Intervalo"));
  }
  finalizarIntervalo(){
    this.jornadaService.finalizarIntervalo(this.finalizarTempoJornada());
  }
  inicializaTempo(tipoJornada:string){
    let data = new Date();
    let hora:string = '';
    let minuto:string = '';
    let segundo:string = '';

    this.jornada.tipo=tipoJornada;
    this.jornada.horaIncio = data.getHours();
    this.jornada.minutoInicio = data.getMinutes();
    this.jornada.segundoInicio = data.getSeconds();
    this.jornada.data = data.getDate() + "/" +(data.getMonth()+1)+ "/" + data.getUTCFullYear();
    
    if (this.jornada.horaIncio <= 9) { hora = "0" + this.jornada.horaIncio }
    else  { hora = this.jornada.horaIncio.toString(); }
    
    if (this.jornada.minutoInicio <= 9) { minuto = "0" + this.jornada.minutoInicio }
    else  { minuto = this.jornada.minutoInicio.toString(); }

    if (this.jornada.segundoInicio <= 9) { segundo = "0" + this.jornada.segundoInicio }
    else  { segundo = this.jornada.segundoInicio.toString(); }
    
    // this.jornada.horarioCompletoInicio = this.jornada.horaIncio+":"+ this.jornada.minutoInicio+":"+this.jornada.segundoInicio;
    this.jornada.horarioCompletoInicio = hora +":"+ minuto + ":" + segundo;

    return this.jornada;
  }

//TODO 
//2-  fazer o evento de deletar jornada da lista
//3 - fazer evento de deletear intervalo da lista
  finalizarTempoJornada(){
    let data = new Date();
    let hora:string = '';
    let minuto:string = '';
    let segundo:string = '';

    this.jornada.horaFim = data.getHours();
    this.jornada.minutoFim = data.getMinutes();
    this.jornada.segundoFim = data.getSeconds();

    if (this.jornada.horaFim <= 9) { hora = "0" + this.jornada.horaFim }
    else  { hora = this.jornada.horaFim.toString(); }
    
    if (this.jornada.minutoFim <= 9) { minuto = "0" + this.jornada.minutoFim }
    else  { minuto = this.jornada.minutoFim.toString(); }

    if (this.jornada.segundoFim <= 9) { segundo = "0" + this.jornada.segundoFim }
    else  { segundo = this.jornada.segundoFim.toString(); }


    // this.jornada.horarioCompletoFim = this.jornada.horaFim+":"+ this.jornada.minutoFim+":"+this.jornada.segundoFim;
    this.jornada.horarioCompletoFim = hora + ":" + minuto + ":" + segundo;
    this.jornada.finalizada=true;
    return this.jornada;
  }

  calculaSubtracaoHoraMinSeg(): string {
    let data = new Date();
    let totalHoraMinSeg: number;
    let totalHoraMinSegTarefa: number;
    let totalSegDuracao: number;


    totalHoraMinSeg = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + (data.getSeconds());
    totalHoraMinSegTarefa = (this.jornada.horaIncio * 60 * 60) + (this.jornada.minutoInicio * 60) + (this.jornada.segundoInicio);
    totalSegDuracao = totalHoraMinSeg - totalHoraMinSegTarefa;

    this.totalHora = (Math.trunc(totalSegDuracao / 3600)).toString();

    this.totalMinuto = (Math.trunc((totalSegDuracao % 3600) / 60)).toString();

    this.totalSegundo = (Math.trunc((totalSegDuracao % 3600) % 60)).toString();

    if (parseInt(this.totalHora) <= 9) { this.totalHora = "0" + this.totalHora }
    if (parseInt(this.totalMinuto) <= 9) { this.totalMinuto = "0" + this.totalMinuto }
    if (parseInt(this.totalSegundo) <= 9) { this.totalSegundo = "0" + this.totalSegundo }

    this.jornada.duracao=this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo;
    
    return (this.totalHora + ":" + this.totalMinuto + ":" + this.totalSegundo);

  } 

}
