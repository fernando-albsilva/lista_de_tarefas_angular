import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements AfterViewInit  {
  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao', 'iniciar','pausar'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
     

   }
  ngAfterViewInit() {
    //  this.dataSource.paginator = this.paginator;
  }


}

export interface PeriodicElement {
  prioridade: string;
  nome_tarefa: number;
  descricao: number;
  iniciar: string;
  pausar: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {nome_tarefa: 1, prioridade: 'Hydrogen', descricao: 1.0079, iniciar: 'H', pausar:'p'},
  // {nome_tarefa: 2, prioridade: 'Helium', descricao: 4.0026, iniciar: 'He'},
  // {nome_tarefa: 3, prioridade: 'Lithium', descricao: 6.941, iniciar: 'Li'},
  // {nome_tarefa: 4, prioridade: 'Beryllium', descricao: 9.0122, iniciar: 'Be'},
  // {nome_tarefa: 5, prioridade: 'Boron', descricao: 10.811, iniciar: 'B'},
  // {nome_tarefa: 6, prioridade: 'Carbon', descricao: 12.0107, iniciar: 'C'},
  // {nome_tarefa: 7, prioridade: 'Nitrogen', descricao: 14.0067, iniciar: 'N'},
  // {nome_tarefa: 8, prioridade: 'Oxygen', descricao: 15.9994, iniciar: 'O'},
  // {nome_tarefa: 9, prioridade: 'Fluorine', descricao: 18.9984, iniciar: 'F'},
  // {nome_tarefa: 10, prioridade: 'Neon', descricao: 20.1797, iniciar: 'Ne'},
  // {nome_tarefa: 11, prioridade: 'Sodium', descricao: 22.9897, iniciar: 'Na'},
  // {nome_tarefa: 12, prioridade: 'Magnesium', descricao: 24.305, iniciar: 'Mg'},
  // {nome_tarefa: 13, prioridade: 'Aluminum', descricao: 26.9815, iniciar: 'Al'},
  // {nome_tarefa: 14, prioridade: 'Silicon', descricao: 28.0855, iniciar: 'Si'},
  // {nome_tarefa: 15, prioridade: 'Phosphorus', descricao: 30.9738, iniciar: 'P'},
  // {nome_tarefa: 16, prioridade: 'Sulfur', descricao: 32.065, iniciar: 'S'},
  // {nome_tarefa: 17, prioridade: 'Chlorine', descricao: 35.453, iniciar: 'Cl'},
  // {nome_tarefa: 18, prioridade: 'Argon', descricao: 39.948, iniciar: 'Ar'},
  // {nome_tarefa: 19, prioridade: 'Potassium', descricao: 39.0983, iniciar: 'K'},
  // {nome_tarefa: 20, prioridade: 'Calcium', descricao: 40.078, iniciar: 'Ca'},
];