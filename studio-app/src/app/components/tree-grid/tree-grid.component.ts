import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
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
  imports: [MatTreeModule, MatButtonModule, MatIconModule]
})
export class TreeGridComponent {
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
    const initData = this.defaultDataService.getDefaultTreeGridData();
    this.dataSource.data = initData;
  }

  hasChild = (_: number, node: TreeFlatNode) => node.expandable;

}
