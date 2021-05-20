import { Component, OnInit } from "@angular/core";
import { DataTransformaDia } from '../DataTransformaDiaEnum';
import { DataTransformaMes } from '../DataTransformaMesEnum';


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
    info_pai_card_3: string[] = [];
    info_classe_green_bg: string[] = [];
    
    constructor() {   }

    ngOnInit(): void{
        let data: Date = new Date();
        
        this.info_pai_card_1.push(
            "Data:",
            data.getDate()+" de "+ DataTransformaMes[(data.getMonth()+1)] +" de "+data.getUTCFullYear(),
            DataTransformaDia[data.getDay()]
        );

        this.info_pai_card_2.push(
            "Tarefas Pendente:",
            "Taregas Concluidas:",
            "Tarefas Ativas"
        );
      
        this.info_pai_card_3.push(
            "Data :"+ data.getDate() + " de " + DataTransformaMes[(data.getMonth()+1)] + " de " + data.getUTCFullYear(),
            "Horas Trabalhadas:" + "00:00:00",
            "Horas Intervalo:" + "00:00:00"
        );

        this.info_classe_green_bg.push("info_classe_green_bg")
    };

}

