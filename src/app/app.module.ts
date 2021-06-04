import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule }   from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { CardHeaderDataComponent } from './sidebar/card-header-data/card-header-data.component';
import { CardHeaderTarefaComponent } from './sidebar/card-header-tarefa/card-header-tarefa.component';
import { CardHeaderJornadaComponent } from './sidebar/card-header-jornada/card-header-jornada.component';
import { CardInformacoesComponent } from './sidebar/card-informacoes/card-informacoes.component';
import { CardAdicionaTarefaComponent } from './sidebar/card-adiciona-tarefa/card-adiciona-tarefa.component';
import { CardAcoesComponent } from './sidebar/card-acoes/card-acoes.component';
import { ListaDeTarefasComponent } from './sidebar/lista-de-tarefas/lista-de-tarefas.component';
import { ModalInformacoesTarefa } from './sidebar/lista-de-tarefas/modal-lista-de-tarefa/modal-informacoes-tarefa';
import { TabelaTarefaAdicionadaComponent } from './sidebar/tabela-tarefa-adicionada/tabela-tarefa-adicionada.component';
import { TarefaService } from './services/tarefa.service';
import { TarefaModel } from './model/TarefaModel';
import { DialogEditaTarefaComponent } from './sidebar/lista-de-tarefas/dialog-edita-tarefa/dialog-edita-tarefa/dialog-edita-tarefa.component';
import { ListaDeTarefaConcluidaComponent } from './sidebar/lista-de-tarefas/lista-de-tarefa-concluida/lista-de-tarefa-concluida/lista-de-tarefa-concluida.component';
import { TabelaTarefaConcluidaComponent } from './sidebar/lista-de-tarefas/lista-de-tarefa-concluida/tabela-tarefa-concluida/tabela-tarefa-concluida/tabela-tarefa-concluida.component';
import { EventoInfoBoxComponent } from './evento-info-box/evento-info-box.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    CardHeaderDataComponent,
    CardHeaderTarefaComponent,
    CardHeaderJornadaComponent,
    CardAdicionaTarefaComponent,
    CardInformacoesComponent,
    CardAcoesComponent,
    ListaDeTarefasComponent,
    ModalInformacoesTarefa,
    TabelaTarefaAdicionadaComponent,
    DialogEditaTarefaComponent,
    ListaDeTarefaConcluidaComponent,
    TabelaTarefaConcluidaComponent,
    EventoInfoBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule

  

  ],
  providers: [
    TarefaService,
    TarefaModel,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
