import { Component, OnInit } from "@angular/core";
import { DataTransformaDia } from '../DataTransformaDiaEnum';
import { DataTransformaMes } from '../DataTransformaMesEnum';
import { TarefaService } from '../services/tarefa.service';


@Component({
    selector: 'ap-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
})
export class SideBarComponent implements OnInit{

    icone_card_one = 'today_outline';
    icone_card_two = 'assessment_outline';
    icone_card_three = 'badge_outline';
    info_pai_card_1: string[] = [];
    info_pai_card_2: string[] = [];
    tarefaPendente: string = "0";
    tarefaConcluida: string = "0";
    tarefaAtiva: string = "0";
    info_pai_card_3: string[] = [];
    info_classe_green_bg: string[] = [];
  
    constructor(private tarefaService:TarefaService) {  
        // this.tarefaService.emitirTarefaPendente.subscribe(quantidadeTarefa => {
        //     console.log("recebeu tarefa");
        //     console.log(quantidadeTarefa);
        //     this.tarefaPendente= quantidadeTarefa.toString();
        //     console.log("tarefaPendente"+this.tarefaPendente);
        //     this.info_pai_card_2=[];
        //     this._reload=false;
        //     this.atualizaCard();
        //     setTimeout(()=>this._reload=true,10);
        // });
     }

    ngOnInit(): void{

        this.atualizaCard();
        // let data: Date = new Date();
        
        // this.info_pai_card_1.push(
        //     "Data:",
        //     data.getDate()+" de "+ DataTransformaMes[(data.getMonth()+1)] +" de "+data.getUTCFullYear(),
        //     DataTransformaDia[data.getDay()]
        //     );

        // this.info_pai_card_2.push(
        //     "Tarefas Pendentes: "+ this.tarefaPendente,
        //     "Taregas Concluidas: " + this.tarefaConcluida,
        //     "Tarefas Ativas: "+ this.tarefaAtiva
        // );
      
        // this.info_pai_card_3.push(
        //     "Data :"+ data.getDate() + " de " + DataTransformaMes[(data.getMonth()+1)] + " de " + data.getUTCFullYear(),
        //     "Horas Trabalhadas:" + "00:00:00",
        //     "Horas Intervalo:" + "00:00:00"
        // );

        // this.info_classe_green_bg.push("info_classe_green_bg");
    };

    atualizaCard(){
        let data: Date = new Date();
        
        this.info_pai_card_1.push(
            "Data:",
            data.getDate()+" de "+ DataTransformaMes[(data.getMonth()+1)] +" de "+data.getUTCFullYear(),
            DataTransformaDia[data.getDay()]
            );

        console.log(this.info_pai_card_2);
        this.info_pai_card_2.push(
            "Tarefas Pendentes: "+ this.tarefaPendente,
            "Tarefas Concluidas: " + this.tarefaConcluida,
            "Tarefas Ativas: "+ this.tarefaAtiva
        );
      
        this.info_pai_card_3.push(
            "Data :"+ data.getDate() + " de " + DataTransformaMes[(data.getMonth()+1)] + " de " + data.getUTCFullYear(),
            "Horas Trabalhadas:" + "00:00:00",
            "Horas Intervalo:" + "00:00:00"
        );

        this.info_classe_green_bg.push("info_classe_green_bg");
    }
}

