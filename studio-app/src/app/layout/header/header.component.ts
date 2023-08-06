import { Component } from '@angular/core';
import { RepoMasterService } from 'src/app/services/repo-master.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  composList$: any;
  pageNumber = 0;
  compoNumber = 0;
  constructor(private dataService: RepoMasterService) {
    this.composList$ = this.dataService.getComponentsAdded();
    this.composList$.subscribe((comps: any) => {
      this.compoNumber = !(comps) ? 0 : Object.keys(comps).length;
    })
  }

}
