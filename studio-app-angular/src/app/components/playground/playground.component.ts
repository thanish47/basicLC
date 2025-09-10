import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { ComponentDefinition, ComponentData } from '../../interfaces/component-data.interface';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrl: './playground.component.css',
    standalone: false
})
export class PlaygroundComponent implements OnInit, OnChanges {
  compType = 'none';
  showConfigurator = false;
  configurationInProgress = false;
  compData: ComponentDefinition = {
    label: '',
    name: '',
    componentRef: '',
    icon: '',
    metaData: {
      label: '',
      dataSource: 'local',
      additionals: {
        dataType: 'array',
        name: '',
        prefix: '',
        selector: ''
      }
    }
  };
  initialMetaData: ComponentDefinition | null = null;
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
    if (!this.configurationInProgress) {
      this.compType = this.dataService.getDropTarget();
      const data = this.dataService.getCompoMetaData(this.compType);
      if (data && data.metaData.dataSource === 'remote') {
        this.fetchFromRemote(data);
      }
    }
  }
  fetchFromRemote(data: ComponentDefinition): void {
    if (!data.metaData.dataUrl) return;
    
    this.dataService.fetchComponentData(data.metaData.dataUrl).subscribe({
      next: (result: any) => {
        data.metaData.data = result;
        this.updateMeta(data);
      },
      error: (err) => {
        data.metaData.data = this.resetComponentData(data);
        this.updateMeta(data);
      }
    });
  }
  updateMeta(data: ComponentDefinition): void {
    this.compData = { ...data };
    this.showConfigurator = true;
    this.repaintPlayground();
  }
  onConfigChange(updatedMeta: ComponentData): void {
    if (updatedMeta.metaData.dataSource === 'remote' && updatedMeta.metaData.dataUrl) {
      const definition: ComponentDefinition = {
        label: updatedMeta.metaData.label,
        name: updatedMeta.name,
        componentRef: this.compData.componentRef,
        icon: this.compData.icon,
        metaData: updatedMeta.metaData
      };
      this.fetchFromRemote(definition);
    } else if (updatedMeta.metaData.dataSource === 'local') {
      this.compData = { 
        ...this.compData,
        name: updatedMeta.name,
        metaData: { ...updatedMeta.metaData }
      };
    }
  }
  resetComponentData(data: ComponentDefinition): any {
    return (data.metaData.additionals.dataType === 'array') ? [] : {};
  }
  repaintPlayground() {
    let tempCompType = this.compType;
    this.compType = '';
      let self = this;
      setTimeout(()=>{
        self.compType = tempCompType;
      }, 400);
  }
}
