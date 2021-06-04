import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup,FormBuilder} from '@angular/forms';

import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';


@Component({
  selector: 'app-card-adiciona-tarefa',
  templateUrl: './card-adiciona-tarefa.component.html',
  styleUrls: ['./card-adiciona-tarefa.component.scss']
 
})


export class CardAdicionaTarefaComponent implements OnInit {

  private tarefa:TarefaModel = new TarefaModel();

  infoBox: boolean = false;
  tarefaForm: FormGroup;
  durationInSeconds:number = 500;
  mesageminfoBox:string = '';
  boxColorClass:string = '';
  
  constructor(
    private tarefaService:TarefaService,
    private formBuilder:FormBuilder)
    {
      this.tarefaForm = this.formBuilder.group({
          nomeTarefa:['',  Validators.compose([Validators.required,  Validators.maxLength(250)])],
          prioridadeTarefa:['', Validators.required],
          descricaoTarefa:['',Validators.required]
      });
      
    }
    
    ngOnInit(): void {
    
    
  }

   onSubmit(){
   
    this.tarefa.nomeTarefa=this.tarefaForm.value.nomeTarefa;
    this.tarefa.prioridade=this.tarefaForm.value.prioridadeTarefa;
    this.tarefa.descricao=this.tarefaForm.value.descricaoTarefa;
    if((this.tarefa.nomeTarefa !== '') && ( (this.tarefa.prioridade !== '') && (this.tarefa.prioridade !== null) ) && (this.tarefa.descricao !== '') )
    {
      
      this.tarefaService.adicionaTarefa(this.tarefa);
      this.tarefa=new TarefaModel();
      setTimeout( ()=> {
          this.tarefa.nomeTarefa='';
          this.tarefa.prioridade='';
          this.tarefa.descricao='';

      },100);
     
      this.mesageminfoBox="Tarefa Adicionada Com sucesso!";

      this.infoBox=true;
      
      setTimeout( ()=> {
        this.infoBox=false;
      },2500);

    }
    else
    {
      this.mesageminfoBox="Campos devem estar preenchidos!";

      this.boxColorClass='red';

      this.infoBox=true;
      
      setTimeout( ()=> {
        this.infoBox=false;
        this.boxColorClass='';
      },3000);

    }
    
  


   
  }

}
