import { CommonModule } from '@angular/common';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TmpDataService } from 'src/app/services/tmp-data.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

/** Flat node with expandable and level information */
interface TreeFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css'],
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatButtonModule, MatIconModule]
})
export class TreeGridComponent implements OnChanges{
  @Input() treeData: any;
  renderTreeGrid = false
  private _transformer = (node: TreeNode, level: number) => {
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

  constructor( private defaultDataService: TmpDataService ) {
    //const initData = this.defaultDataService.getDefaultTreeGridData();
    //this.dataSource.data = initData;
  }

  hasChild = (_: number, node: TreeFlatNode) => node.expandable;

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];
      if(change && change.currentValue) {
        const initData = change.currentValue;
        this.dataSource.data = initData.data;
        this.renderTreeGrid = true;
      }
    }
  }

}
