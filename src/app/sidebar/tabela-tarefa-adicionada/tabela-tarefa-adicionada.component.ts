import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TarefaModel } from 'src/app/model/TarefaModel';


@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements AfterViewInit  {
  
  dataTable:any[] = [];
  tarefas: TarefaModel[] = [];


  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao'];
  dataSource = new MatTableDataSource<TarefaModelInterface>(this.dataTable);
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
     
    for (let index = 0; index < 30; index++) {
      let tarefa: TarefaModel = new TarefaModel(); 
      tarefa.nomeTarefa = "tarefa " + index ;
      tarefa.prioridade = index.toString();
      tarefa.descricao = " descrição da tarefa " + index;
      this.tarefas.push(tarefa);
      //tarefas.push( {nome_tarefa: 1, prioridade: 'Hydrogen', descricao: 1.0079, iniciar: 'H', pausar:'p'});  
    }
    this.tarefas.map((elemento)=>{
      
      this.dataTable.push( {nome_tarefa:elemento.nomeTarefa, prioridade:elemento.prioridade, descricao:elemento.descricao} );

      // console.log(this.dataTable);
      // return ({elemento._nomeTarefa,elemento.prioridade, elemento.descricao});

    });
      console.log(this.dataTable);
    // console.log(this.tarefas);

   }
  ngAfterViewInit() {
    //  this.dataSource.paginator = this.paginator;
  }


}

export interface TarefaModelInterface {
  prioridade: string;
  nome_tarefa: number;
  descricao: number;
}

