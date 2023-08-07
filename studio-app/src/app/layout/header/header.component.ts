import { Component } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  composList$: any;
  pageNumber = 0;
  compoNumber = 0;
  comps = [];
  constructor(private dataService: RepoMasterService, private exportCompService: GeneratorService) {
    this.composList$ = this.dataService.getComponentsAdded();
    this.composList$.subscribe((comps: any) => {
      this.compoNumber = !(comps) ? 0 : Object.keys(comps).length;
      this.comps = comps;
    })
  }
  exportComponents() {
    if(this.compoNumber > 0) {
      this.exportCompService.exportComponents(this.comps);
    }
  }

  getToolTip() {
    return (this.compoNumber > 0) ? 'Click to export Components Basket' : 'Add item to Components Basket to export from here';
  }

}
