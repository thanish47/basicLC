import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepoMasterService {
  compoDef: any = [
    {
      label: "Tree Grid",
      name: "treeGrid",
      componentRef: "treeGridComponent",
      icon: "tree-table"
    },{
      label: "Tree Graph",
      name: "treeGraph",
      componentRef: "treeGraphComponent",
      icon: "tree-45"
    }
  ];
  dropTarget: '';
  constructor() { }

  setDropTarget(comp: any) {
    console.log('setting drop', comp);
    this.dropTarget = comp;
  }

  getDropTarget() {
    return this.dropTarget;
  }
}
