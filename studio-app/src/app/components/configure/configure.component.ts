import { Component } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { TmpDataService } from 'src/app/services/tmp-data.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent {
  data: any;
  editorOptions: any;
  dataSource: any;
  constructor(private defaultDataService: TmpDataService) {
    this.data = this.defaultDataService.getDefaultData();
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.editorOptions.statusBar = false;
    this.dataSource = 'local'
  }


}
