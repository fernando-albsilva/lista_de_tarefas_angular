import { Component, Input, OnInit } from '@angular/core';
import { TarefaService } from 'src/app/services/tarefa.service';

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

  constructor(private tarefaService:TarefaService) {
    this.escutaTarefaPendente();
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

  escutaTarefaPendente(){
    this.tarefaService.emitirTarefaPendente.subscribe(quantidadeTarefa => {
      this.info_1="TarefasPendentes: "+ quantidadeTarefa.toString();
  });
  }
  
}
