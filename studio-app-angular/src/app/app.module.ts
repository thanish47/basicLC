import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';

import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from '@angular/material/list'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { ComponentBarComponent } from './layout/component-bar/component-bar.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeGridComponent } from './components/tree-grid/tree-grid.component';
import { TreeGraphComponent } from './components/tree-graph/tree-graph.component';
import { RightSidePanelComponent } from './layout/right-side-panel/right-side-panel.component';
import { JsonEditorComponent } from './utils/json-editor/json-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComponentBarComponent,
    PlaygroundComponent,
    ConfigureComponent,
    TreeGraphComponent,
    JsonEditorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    TreeGridComponent,
    RightSidePanelComponent,
    FormsModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
