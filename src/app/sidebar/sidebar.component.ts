import { Component, OnInit } from "@angular/core";
// import jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import { DataTransformaDia } from '../DataTransformaDiaEnum';
import { DataTransformaMes } from '../DataTransformaMesEnum';
import { JornadaModel } from '../model/JornadaModel';
import { TarefaModel } from '../model/TarefaModel';
import { JornadaService } from '../services/jornada.service';
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
  
    constructor(private tarefaService:TarefaService,
                private JornadaService: JornadaService){
      
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
        let data = new Date();
        let listaJornada: JornadaModel[] = this.JornadaService.listaJornada;
        let listaTarefaConcluida: TarefaModel[] = this.tarefaService.listaDeTarefasConcluida;
        let alturaLinha:number=10;
        
        let doc = new jsPDF();
       
        doc.setLineWidth(0.2);

        alturaLinha = this.preenchePdfJornada(doc,alturaLinha,listaJornada,data);
        alturaLinha = this.preenchePdfTarefa(doc,alturaLinha,listaTarefaConcluida,data);
       
        window.open(doc.output('dataurl').toString(), '_blank')
     

    }

    createPdf(){
    
        let data = new Date();
        let listaJornada: JornadaModel[] = this.JornadaService.listaJornada;
        let listaTarefaConcluida: TarefaModel[] = this.tarefaService.listaDeTarefasConcluida;
        let alturaLinha:number=10;
        
        let doc = new jsPDF();
       
        doc.setLineWidth(0.2); // seta espessura da linha
        alturaLinha = this.preenchePdfJornada(doc,alturaLinha,listaJornada,data);
        alturaLinha = this.preenchePdfTarefa(doc,alturaLinha,listaTarefaConcluida,data);

        doc.save('Relatorio.pdf');

    }

    preenchePdfJornada(doc:jsPDF,alturaLinha:number,listaJornada:JornadaModel[],data:Date):number{

        doc.setFont("times", "bold"); // seta tipo e peso da fonte
        doc.setFontSize(14); // seta o tamanho da fonte
        doc.text('Resumo Jornada:', 10, alturaLinha); // seta o texto no arquivo
        doc.setFont("times", "normal");
        doc.setFontSize(10);
        alturaLinha+=10;
        listaJornada.map((elemento:JornadaModel)=>{
            doc.text("Tipo: " + elemento.tipo + " - Registro: " + "Inicio" + " - Data: " + elemento.data + " - Horário: " + elemento.horarioCompletoInicio, 10, alturaLinha);
            doc.line(10, alturaLinha+2, 200, alturaLinha+2);
            alturaLinha+=10;
            doc.text("Tipo: " + elemento.tipo + " - Registro: " + "Fim   " + " - Data: " + elemento.data + " - Horário: " + elemento.horarioCompletoFim, 10, alturaLinha);
            // doc.setLineWidth(0.5);
            doc.line(10, alturaLinha+2, 200, alturaLinha+2);
            alturaLinha+=10;
            
        });
        
        
        alturaLinha+=20;
        return alturaLinha;
     
    }

    preenchePdfTarefa(doc:jsPDF,alturaLinha:number,listaTarefaConcluida:TarefaModel[],data:Date):number{
            doc.setFont("times", "bold");
            doc.setFontSize(14);
            doc.text('Resumo Tarefa Concluida:', 10, alturaLinha);
            doc.setFontSize(10);
            doc.setFont("times", "normal");
            alturaLinha+=10;
            listaTarefaConcluida.map((elemento:TarefaModel)=>{
                doc.text("Nome: "+ elemento.nomeTarefa + " - Prioridade: " + elemento.prioridade + "- Duração: " + elemento.duracao  , 10, alturaLinha);
                doc.line(10, alturaLinha+2, 200, alturaLinha+2);
                alturaLinha+=10;
                
            });
            
            alturaLinha+=20;
            return alturaLinha;
     }
}

