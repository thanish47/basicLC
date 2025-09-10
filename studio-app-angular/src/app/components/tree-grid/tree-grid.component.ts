import { CommonModule } from '@angular/common';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TreeNodeData } from '../../interfaces/component-data.interface';


/** Flat node with expandable and level information */
interface TreeFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
    selector: 'app-tree-grid',
    templateUrl: './tree-grid.component.html',
    styleUrl: './tree-grid.component.css',
    imports: [CommonModule, MatTreeModule, MatButtonModule, MatIconModule]
})
export class TreeGridComponent implements OnChanges{
  @Input() treeData: any = null;
  renderTreeGrid = false
  private _transformer = (node: TreeNodeData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<TreeFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {}

  hasChild = (_: number, node: TreeFlatNode) => node.expandable;

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const change = changes[propName];
      if (change?.currentValue?.data) {
        const initData = change.currentValue;
        this.dataSource.data = initData.data;
        this.renderTreeGrid = true;
      }
    }
  }

}
