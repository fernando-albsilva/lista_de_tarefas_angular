import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaService } from '../../services/tarefa.service'

@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements OnInit {

  dataTable: any[] = [];


  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao'];
  dataSource: any = new MatTableDataSource<TarefaModelInterface>(this.dataTable);


  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.tarefaService.emitirTarefaAdicionada.subscribe(
      tarefaCriada => {
        this.recarregaLista(tarefaCriada);

      }
    );
  }

  recarregaLista(tarefaCriada: any) {
    this.dataTable.push(tarefaCriada);
    this.ordenaListaPorPrioridade();


    this.dataSource = new MatTableDataSource<TarefaModelInterface>(this.dataTable);

  }



  deleteTarefa($event: Event, indice: string) {
    this.tarefaService.deleteTarefa(indice);
    this.tarefaService.listaDeTarefas = this.tarefaService.listaDeTarefas.filter((el: any) => {
      return el.indice !== indice;
    });
    this.dataTable = [];
    this.tarefaService.listaDeTarefas.map((elemento) => {
      this.dataTable.push(elemento);
    });
    this.ordenaListaPorPrioridade();
    this.dataSource = new MatTableDataSource<TarefaModelInterface>(this.dataTable);
  }

  ordenaListaPorPrioridade() {
    this.dataTable.sort((a, b) => {
      if (parseInt(a.prioridade) < parseInt(b.prioridade)) { return -1; }
      if (parseInt(a.prioridade) > parseInt(b.prioridade)) { return 1; }
      return 0;
    });
  }

}

export interface TarefaModelInterface {
  prioridade: string;
  nome_tarefa: number;
  descricao: number;
}

