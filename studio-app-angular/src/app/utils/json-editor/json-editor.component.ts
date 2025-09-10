import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';

export interface JsonEditorOptions {
  mode?: 'code' | 'tree' | 'view';
  theme?: 'light' | 'dark';
  lineNumbers?: boolean;
  readOnly?: boolean;
  maxHeight?: string;
}

@Component({
    selector: 'app-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.css'],
    standalone: false
})
export class JsonEditorComponent implements OnInit {
  @Input() data: any = {};
  @Input() options: JsonEditorOptions = {
    mode: 'code',
    theme: 'light',
    lineNumbers: true,
    readOnly: false,
    maxHeight: '400px'
  };
  @Output() dataChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();
  
  @ViewChild('jsonTextarea', { static: true }) textareaRef!: ElementRef<HTMLTextAreaElement>;
  
  jsonString: string = '';
  isValidJson: boolean = true;
  errorMessage: string = '';

  ngOnInit() {
    this.jsonString = JSON.stringify(this.data, null, 2);
  }

  onTextChange() {
    try {
      const parsed = JSON.parse(this.jsonString);
      this.data = parsed;
      this.isValidJson = true;
      this.errorMessage = '';
      this.dataChange.emit(parsed);
      this.onChange.emit(parsed);
    } catch (error) {
      this.isValidJson = false;
      this.errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
    }
  }

  get(): any {
    return this.isValidJson ? this.data : null;
  }

  set(data: any): void {
    this.data = data;
    this.jsonString = JSON.stringify(data, null, 2);
    this.isValidJson = true;
    this.errorMessage = '';
  }

  formatJson(): void {
    if (this.isValidJson) {
      this.jsonString = JSON.stringify(this.data, null, 2);
    }
  }

  minifyJson(): void {
    if (this.isValidJson) {
      this.jsonString = JSON.stringify(this.data);
    }
  }

  getLineNumbers(): number[] {
    const lines = this.jsonString.split('\n').length;
    return Array.from({length: lines}, (_, i) => i + 1);
  }
}