import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnChanges {
  compType = 'none';
  showConfigurator = false;
  configurationInProgress = false;
  compData: any = {
    metaData: {}
  };
  initialMetaData: any;
  constructor(private dataService: RepoMasterService) {

  }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    let change =  changes['compo'];
    if(change && change.previousValue && change.currentValue.compoType && (change.currentValue.compoType !== change.previousValue.compoType) ) {
      
    }
  }
  allowDrop (ev: any) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  onDrop(ev: any) {
    if(!this.configurationInProgress) {
      this.compType = this.dataService.getDropTarget();
      let data = this.dataService.getCompoMetaData(this.compType);
      if(data.metaData.dataSource === 'remote') {
        this.fetchFromRemote(data);
      }
    }
  }
  fetchFromRemote(data: any) {
    this.dataService.fetchComponentData(data.metaData.dataUrl).subscribe({
      next: (result) => {
        data.metaData.data = result;
        this.updateMeta(data);
      },
      error: (err) => {
        data.metaData.data = (data.metaData.additionals.dataType === 'array') ? [] : {};
        this.updateMeta(data);
      }
    })
  }
  updateMeta(data: any) {
    this.compData = data;
    this.showConfigurator = true;
  }
  onConfigChange(updatedMeta: any) {
    if(updatedMeta.metaData.dataSource === 'remote' && updatedMeta.metaData.dataUrl !== this.compData.metaData.dataUrl) {
      this.fetchFromRemote(updatedMeta);
    } else if(updatedMeta.metaData.dataSource === 'local') {
      this.compData = {...updatedMeta};
    }
  }
}
