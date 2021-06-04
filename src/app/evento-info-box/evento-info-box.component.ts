import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-evento-info-box',
  templateUrl: './evento-info-box.component.html',
  styleUrls: ['./evento-info-box.component.scss']
})

export class EventoInfoBoxComponent implements OnInit {
  
  @Input() mesageminfoBox:string='';
  @Input() boxColorClass:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
