import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { ExportFileContent, ComponentData } from '../interfaces/component-data.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private http: HttpClient) { }

  async exportComponents(components: Record<string, ComponentData>): Promise<void> {
    const compKeys = Object.keys(components);
    if (compKeys.length) {
      try {
        const promiseArr = compKeys.map(comp => this.processTemplate(components[comp]));
        const resolvedTemplates = await Promise.all(promiseArr);
        this.packageFilesFoldersAsZip(resolvedTemplates);
      } catch (error) {
        console.error('Error exporting components:', error);
      }
    }
  }

  async packageFilesFoldersAsZip(filesMap: ExportFileContent[]): Promise<void> {
    if (filesMap && filesMap.length) {
      const zip = new JSZip();
      
      filesMap.forEach((fileContent: ExportFileContent) => {
        if (fileContent.type === 'component') {
          zip.folder(fileContent.name);
          zip.file(`${fileContent.name}/${fileContent.name}.component.ts`, new Blob([fileContent.jsTemplate], { type: 'text/javascript' }));
          if (fileContent.htmlTemplate) {
            zip.file(`${fileContent.name}/${fileContent.name}.component.html`, new Blob([fileContent.htmlTemplate], { type: 'text/html' }));
          }
          if (fileContent.cssTemplate) {
            zip.file(`${fileContent.name}/${fileContent.name}.component.css`, new Blob([fileContent.cssTemplate], { type: 'text/css' }));
          }
          if (fileContent.mdTemplate) {
            zip.file(`${fileContent.name}/${fileContent.name}.component.md`, new Blob([fileContent.mdTemplate], { type: 'text/markdown' }));
          }
        }
        if (fileContent.type === 'service') {
          zip.folder('services');
          zip.file(`services/${fileContent.name}.service.ts`, new Blob([fileContent.jsTemplate], { type: 'text/javascript' }));
        }
      });
      
      try {
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'exportedComponents.zip');
      } catch (error) {
        console.error('Error generating zip file:', error);
      }
    }
  }

  async processTemplate(comp: ComponentData): Promise<ExportFileContent> {
    const compObj = { ...comp };
    const url = `/assets/templates/${compObj.name}Template.txt`;
    
    try {
      const templateContent = await this.http.get(url, { responseType: 'text' }).toPromise();
      let templateString = templateContent || '';
      const templates = templateString.match(/(\$\{)(.*?)(\})/g);
      
      if (templates && templates.length > 0) {
        templates.forEach((str: string) => {
          const replacer = str.replace('${', '').replace('}', '');
          const replacement = (compObj.metaData.additionals as any)[replacer] || '';
          templateString = templateString.replace(str, replacement);
        });
      }
      
      const fileStrings = templateString.split('########');
      const resolvedData: ExportFileContent = {
        jsTemplate: fileStrings[0] || '',
        htmlTemplate: fileStrings[1],
        cssTemplate: fileStrings[2],
        name: compObj.metaData.additionals.selector,
        type: 'component'
      };
      
      if (fileStrings[3]) {
        resolvedData.mdTemplate = fileStrings[3];
      }
      
      return resolvedData;
    } catch (error) {
      console.error('Error processing template:', error);
      throw error;
    }
  }
}
