import {  Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaService } from '../../services/tarefa.service'

@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements OnInit  {
  
  dataTable:any[] = [];
  
  
  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao'];
  dataSource:any = new MatTableDataSource<TarefaModelInterface>(this.dataTable);

  listaDeTarefas:any[];
  
  teste:any;
  constructor(private tarefaService : TarefaService ) {
   
    this.listaDeTarefas=tarefaService.listaDeTarefas;
    
     
     console.log("datatable");
     console.log(this.dataTable);
      
     this.listaDeTarefas.map((elemento) => {
        this.dataTable.push(elemento);
     });
   
   }
   
   ngOnInit(){
     this.tarefaService.emitirTarefaAdicionada.subscribe(
        tarefaCriada => {
          this.recarregaLista(tarefaCriada);
          console.log("transmitida:");
          console.log(tarefaCriada);
        }
     );
   }

   recarregaLista(tarefaCriada:any){
    this.dataTable.push(tarefaCriada);
    this.dataSource = new MatTableDataSource<TarefaModelInterface>(this.dataTable);
    
    console.log("dataTable");
    console.log(this.dataTable);
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

