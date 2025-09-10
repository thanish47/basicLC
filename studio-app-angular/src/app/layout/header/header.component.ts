import { Component, Output, EventEmitter } from '@angular/core';
import { VERSION } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { ComponentData } from '../../interfaces/component-data.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent {
  @Output("toggleRPanel") toggleRPanel: EventEmitter<void> = new EventEmitter<void>();
  composList$: BehaviorSubject<Record<string, ComponentData>>;
  pageNumber = 0;
  compoNumber = 0;
  toggleStatus = false;
  angularVersion = VERSION.major;
  
  constructor(private dataService: RepoMasterService) {
    this.composList$ = this.dataService.getComponentsAdded();
    this.composList$.subscribe((comps: Record<string, ComponentData>) => {
      this.compoNumber = comps ? Object.keys(comps).length : 0;
    });
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
