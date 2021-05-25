import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup,FormBuilder} from '@angular/forms';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';



@Component({
  selector: 'app-card-adiciona-tarefa',
  templateUrl: './card-adiciona-tarefa.component.html',
  styleUrls: ['./card-adiciona-tarefa.component.scss']
 
})


export class CardAdicionaTarefaComponent implements OnInit {

   
  // tarefa: TarefaModel = new TarefaModel();
  // tarefaService=new TarefaService();
  // submitted = false;
  // tarefaForm: FormGroup ;
  // formBuilder: FormBuilder = new FormBuilder();
  tarefaForm: FormGroup;

  constructor(
    private tarefaService:TarefaService,
    private tarefa:TarefaModel,
    private formBuilder:FormBuilder
    ) {

      this.tarefaForm = this.formBuilder.group({
          nomeTarefa:['', Validators.required],
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
    if((this.tarefa.nomeTarefa !== '') && (this.tarefa.prioridade !== '') && (this.tarefa.descricao !== '') )
    {
     setTimeout( ()=> {
        this.tarefaService.adicionaTarefa(this.tarefa);
        this.tarefa.nomeTarefa='';
        this.tarefa.prioridade='';
        this.tarefa.descricao='';

     },100);
    }
  }

}
