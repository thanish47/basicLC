export interface ComponentMetaData {
  label: string;
  dataSource: 'remote' | 'local';
  dataUrl?: string;
  data?: any[];
  additionals: {
    dataType: 'array' | 'object';
    name: string;
    prefix: string;
    selector: string;
  };
}

export interface ComponentDataWithIcon extends ComponentData {
  icon: string;
}

export interface ComponentDefinition {
  label: string;
  name: string;
  componentRef: string;
  icon: string;
  metaData: ComponentMetaData;
}

export interface ComponentData {
  name: string;
  metaData: ComponentMetaData;
}

export interface TreeNodeData {
  name: string;
  children?: TreeNodeData[];
}

export interface ExportFileContent {
  type: 'component' | 'service';
  name: string;
  jsTemplate: string;
  htmlTemplate?: string;
  cssTemplate?: string;
  mdTemplate?: string;
}

export interface ComponentItem {
  name: string;
  icon: string;
}