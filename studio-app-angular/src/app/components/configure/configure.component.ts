import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TmpDataService } from 'src/app/services/tmp-data.service';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { JsonEditorComponent } from '../../utils/json-editor/json-editor.component';

@Component({
    selector: 'app-configure',
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.css'],
    standalone: false
})
export class ConfigureComponent implements OnChanges {
  @Input() compoObj: any;
  @Output() onConfigChange = new EventEmitter<any>();
  @ViewChild('jsonEditor', { static: false }) jsonEditor: JsonEditorComponent;
  componentData: any = {};
  metaData: any = {
    data: [],
    dataSource: ""
  }
  initData: any;
  isDataReady = false;
  sampleData: any;
  editorOptions: any;
  dataSource: any;
  compoCount$: any;
  remoteData: any;
  localData: any;
  constructor(private defaultDataService: TmpDataService, private repoMaster: RepoMasterService) {
    this.sampleData = this.defaultDataService.getDefaultData();
    

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];
      if(change.currentValue) {
        this.componentData = change.currentValue;
        this.metaData = this.componentData.metaData;
        this.initData = {...this.componentData};
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
    let name = this.componentData.name;
    let tempObj: any = {};
    this.componentData.metaData = this.metaData;
    tempObj[name] = this.componentData;
    this.repoMaster.updateComponentCount(tempObj);
  }

  editorDataChanged(updatedJSONData: any) {
    this.metaData.data = updatedJSONData;
  }
  onDataSourceChange(){

  }




}
