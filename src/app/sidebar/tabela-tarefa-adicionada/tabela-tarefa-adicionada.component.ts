import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaService } from '../../services/tarefa.service'

@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements AfterViewInit  {
  
  dataTable:any[] = [];
  
  
  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao'];
  dataSource = new MatTableDataSource<TarefaModelInterface>(this.dataTable);

  listaDeTarefas:any[];

  constructor(tarefaService : TarefaService) {
   
    this.listaDeTarefas=tarefaService.listaDeTarefas;
    
     
     console.log("datatable");
     console.log(this.dataTable);

     this.listaDeTarefas.map((elemento) => {
        this.dataTable.push(elemento);
     });

    //  this.listaDeTarefas=tarefaService.verifica.subscribe( x =>{
    //       this.listaDeTarefas.push(x);
    //  });
   
   }
  ngAfterViewInit() {
     
  
  }

  clicouNalinha($event:Event, el:any){
    // alert("clicou"+$event.target);
    // console.log($event.currentTarget);
    // let elemento = $event;
    console.log($event);
    console.log(el);
    
  }

}

export interface TarefaModelInterface {
  prioridade: string;
  nome_tarefa: number;
  descricao: number;
}

