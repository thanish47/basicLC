import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGridComponent } from './tree-grid.component';

describe('TreeGridComponent', () => {
  let component: TreeGridComponent;
  let fixture: ComponentFixture<TreeGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeGridComponent]
    });
    fixture = TestBed.createComponent(TreeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
