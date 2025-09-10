import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComponentDefinition, ComponentData } from '../interfaces/component-data.interface';

@Injectable({
  providedIn: 'root'
})
export class RepoMasterService {
  compoDef: ComponentDefinition[] = [
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
          name: "TreeGrid",
          prefix: "app",
          selector: "tree-grid"
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
          name: "TreeGraph",
          prefix: "app",
          selector: "tree-graph"
        }
      }
    }
  ];
  dropTarget: string = '';
  private componentsAdded: BehaviorSubject<Record<string, ComponentData>> = new BehaviorSubject<Record<string, ComponentData>>({});

  constructor(private http: HttpClient) { }

  setDropTarget(comp: string) {
    this.dropTarget = comp;
  }

  getDropTarget() {
    return this.dropTarget;
  }

  getComponentsAdded(): BehaviorSubject<Record<string, ComponentData>> {
    return this.componentsAdded;
  }

  updateComponentCount(component: Record<string, ComponentData>) {
    this.componentsAdded.next({...this.componentsAdded.value, ...component})
  }

  fetchComponentData(url: string): Observable<any> {
    return this.http.get(url)
  }

  getCompoMetaData(compName: string): ComponentDefinition | undefined {
    return this.compoDef.find((compDef: ComponentDefinition) => compDef.name === compName);
  }

}
