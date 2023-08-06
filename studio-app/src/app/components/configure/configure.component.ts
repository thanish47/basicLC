import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { TmpDataService } from 'src/app/services/tmp-data.service';
import { RepoMasterService } from 'src/app/services/repo-master.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnChanges {
  @Input() compoObj: any;
  @Output() onConfigChange = new EventEmitter<any>();
  componentData: any = {
    data: [],
    dataSource: ""
  };
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
    
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.editorOptions.statusBar = false;
    
    //this.compoCount$ = this.repoMaster.getComponentsAdded();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];
      this.componentData = change.currentValue;
      this.initData = {...this.componentData};
      this.isDataReady = true;
    }
  }

  applyConfiguration() {
    if(this.componentData.dataSource !== this.initData.dataSource) {
      if(this.componentData.dataSource === 'local') {
        //fetch the updated data from editor, and reflect it to componentData.data, and re-render the tree
      } else if(this.componentData.dataSource === 'remote') {
        //check if the entered URL is in correct format, if yes fetch the data.. 
        //if result is without error, then re-render the tree with it
      }
    }
    this.onConfigChange.emit(this.componentData);
  }

  addCompoToBasket() {
    this.repoMaster.updateComponentCount(this.componentData);
  }
  onDataSourceChange(){

  }




}
