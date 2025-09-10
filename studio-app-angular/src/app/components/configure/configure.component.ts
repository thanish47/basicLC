import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TmpDataService } from 'src/app/services/tmp-data.service';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { JsonEditorComponent } from '../../utils/json-editor/json-editor.component';
import { ComponentData, ComponentDefinition, ComponentMetaData } from '../../interfaces/component-data.interface';

@Component({
    selector: 'app-configure',
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.css',
    standalone: false
})
export class ConfigureComponent implements OnChanges {
  @Input() compoObj: ComponentDefinition | null = null;
  @Output() onConfigChange = new EventEmitter<ComponentData>();
  @ViewChild('jsonEditor', { static: false }) jsonEditor!: JsonEditorComponent;
  componentData: ComponentData = { name: '', metaData: { label: '', dataSource: 'local', additionals: { dataType: 'array', name: '', prefix: '', selector: '' } } };
  metaData: ComponentMetaData = {
    label: '',
    dataSource: 'local',
    additionals: {
      dataType: 'array',
      name: '',
      prefix: '',
      selector: ''
    }
  };
  initData: ComponentDefinition | null = null;
  isDataReady = false;
  sampleData: any;
  editorOptions: any;
  dataSource: string = '';
  compoCount$: any;
  remoteData: any;
  localData: any;
  constructor(private defaultDataService: TmpDataService, private repoMaster: RepoMasterService) {
    this.sampleData = this.defaultDataService.getDefaultData();
    

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const change = changes[propName];
      if (change?.currentValue) {
        this.componentData = { ...change.currentValue };
        this.metaData = { ...this.componentData.metaData };
        this.initData = change.currentValue;
        this.isDataReady = true;
      }
    }
  }

  applyConfiguration() {
    if(this.metaData.dataSource === 'local') {
      // Data is already updated via editorDataChanged event
      // No need to manually get data from editor
    } else if(this.metaData.dataSource === 'remote') {
      // TODO: Implement URL validation and fetching logic
      console.log('Remote data source selected:', this.metaData.dataUrl);
    }
    this.componentData.metaData = this.metaData;
    this.onConfigChange.emit(this.componentData);
  }

  addCompoToBasket() {
    const name = this.componentData.name;
    const tempObj: Record<string, ComponentData> = {};
    this.componentData.metaData = this.metaData;
    tempObj[name] = this.componentData;
    this.repoMaster.updateComponentCount(tempObj);
  }

  editorDataChanged(updatedJSONData: any[]): void {
    this.metaData.data = updatedJSONData;
  }
  onDataSourceChange(){

  }




}
