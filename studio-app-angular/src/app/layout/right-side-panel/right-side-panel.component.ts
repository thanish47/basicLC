import { Component, OnInit } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';

@Component({
    selector: 'app-right-side-panel',
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './right-side-panel.component.html',
    styleUrl: './right-side-panel.component.css'
})
export class RightSidePanelComponent implements OnInit {
  composList$: any;
  showPanel = false;
  comps: any;
  compKeys: any = [];
  cmps = [
    {
      name: "treeGrid",
      icon: "tree-table"
    },
    {
      name: "treeGraph",
      icon: "tree-45",
    }
  ]
  constructor(private dataService: RepoMasterService, private exportCompService: GeneratorService) {
    this.composList$ = this.dataService.getComponentsAdded();
  }

  ngOnInit(): void {
    this.composList$.subscribe((comps: any) => {
      //console.log('comps', comps)
      this.comps = comps;
      this.compKeys = Object.keys(comps)
    })
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  exportComponents() {
    this.exportCompService.exportComponents(this.comps);
  }

}
