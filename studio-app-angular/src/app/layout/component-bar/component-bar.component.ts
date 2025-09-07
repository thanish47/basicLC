import { Component } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';

@Component({
  selector: 'app-component-bar',
  templateUrl: './component-bar.component.html',
  styleUrls: ['./component-bar.component.css']
})
export class ComponentBarComponent {
  constructor(private dataService: RepoMasterService) {

  }
  allowDrop(ev: any) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  dragStart(ev: any, compo: any) {
    console.log('drag start event', ev.target.id, compo);
    ev.dataTransfer.setData("text/plain", ev.target.id);
    this.dataService.setDropTarget(compo)
  }
}
