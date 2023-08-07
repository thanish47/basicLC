import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepoMasterService {
  compoDef: any = [
    {
      label: "Tree Grid",
      name: "treeGrid",
      componentRef: "treeGridComponent",
      icon: "tree-table",
      metaData: {
        label: '',
        dataSource: 'remote',
        dataUrl: '/assets/data/sampleTreeGrid.json',
        additionals: {
          dataType: 'array',
          name: "TreeGraph",
          prefix: "app",
          selector: "tree-graph"
        }
      }
    },{
      label: "Tree Graph",
      name: "treeGraph",
      componentRef: "treeGraphComponent",
      icon: "tree-45",
      metaData: {
        label: '',
        dataSource: 'remote',
        dataUrl: '/assets/data/sampleTreeGraph.json',
        additionals: {
          dataType: 'object',
          name: "TreeGrid",
          prefix: "app",
          selector: "tree-grid"
        }
      }
    }
  ];
  dropTarget: '';
  private componentsAdded: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

  setDropTarget(comp: any) {
    this.dropTarget = comp;
  }

  getDropTarget() {
    return this.dropTarget;
  }

  getComponentsAdded(): BehaviorSubject<any> {
    return this.componentsAdded;
  }

  updateComponentCount(component: any) {
    this.componentsAdded.next({...this.componentsAdded.value, ...component})
  }

  fetchComponentData(url: string) {
    return this.http.get(url)
  }

  getCompoMetaData(compName: string) {
    const filteredComp = this.compoDef.filter((compDef: any) => {
      return (compDef.name === compName);
    })
    return filteredComp[0];
  }

}
