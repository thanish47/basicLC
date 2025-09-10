import { Component, Output, EventEmitter } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent {
  @Output("toggleRPanel") toggleRPanel: EventEmitter<any> = new EventEmitter();
  composList$: any;
  pageNumber = 0;
  compoNumber = 0;
  toggleStatus = false;
  
  constructor(private dataService: RepoMasterService) {
    this.composList$ = this.dataService.getComponentsAdded();
    this.composList$.subscribe((comps: any) => {
      this.compoNumber = !(comps) ? 0 : Object.keys(comps).length;
    })
  }
  showHideExportPanel() {
    if(this.compoNumber > 0) {
      //this.exportCompService.exportComponents(this.comps);
      this.toggleRPanel.emit();
      this.toggleStatus = !this.toggleStatus;
    }
  }

  getToolTip() {
    return (this.compoNumber > 0) ? 'Click to export Components Basket' : 'Add item to Components Basket to export from here';
  }

}
