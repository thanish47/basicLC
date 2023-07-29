import { Component, OnInit } from '@angular/core';
import { TmpDataService } from 'src/app/services/tmp-data.service';
import { RepoMasterService } from 'src/app/services/repo-master.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  compType = 'none';
  showConfigurator = false;
  constructor(private tmpData: TmpDataService, private dataService: RepoMasterService) {

  }

  ngOnInit(): void {
    
  }
  allowDrop (ev: any) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  onDrop(ev: any) {
    this.compType = this.dataService.getDropTarget();
    this.showConfigurator = true;
  }
}
