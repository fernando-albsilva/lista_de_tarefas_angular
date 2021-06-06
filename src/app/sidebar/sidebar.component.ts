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
  
    constructor(private tarefaService:TarefaService){
      
     }

    ngOnInit(): void{

        this.atualizaCard();
        
    };

    atualizaCard(){
        let data: Date = new Date();
        
        this.info_pai_card_1.push(
            "Data:",
            data.getDate()+" de "+ DataTransformaMes[(data.getMonth())] +" de "+data.getUTCFullYear(),
            DataTransformaDia[data.getDay()]
            );

        this.info_pai_card_2.push(
            "Tarefas Pendentes: "+ this.tarefaPendente,
            "Tarefas Concluidas: " + this.tarefaConcluida,
            "Tarefas Ativas: "+ this.tarefaAtiva
        );
      
        this.info_pai_card_3.push(
            "Data :"+ data.getDate() + " de " + DataTransformaMes[(data.getMonth())] + " de " + data.getUTCFullYear(),
            "Horas Trabalhadas:" + "00:00:00",
            "Horas Intervalo:" + "00:00:00"
        );

        this.info_classe_green_bg.push("info_classe_green_bg");
    }

    printPage(){
        let w:any;
        w=window.open();
        w.document.write(document.getElementById('imprime')?.textContent);
        w.print();
        w.close();
    }
}

