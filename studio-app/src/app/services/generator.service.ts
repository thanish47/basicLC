import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private http: HttpClient) { }

  exportComponents(components: any) {
    let compKeys = Object.keys(components);
    let promiseArr:any = [];
    if(compKeys.length) {
      compKeys.forEach((comp) => {
        promiseArr.push(this.processTemplate(components[comp]));
      })
      Promise.all(promiseArr).then((resolvedTemplates: any) => {
       let resolvedCompFilesContent = resolvedTemplates.map((content: any)=>{
          return {fileBlob: new Blob([content.template], { type : 'text/javascript' }), fileName: content.name+'component.ts' }
        })
        var zip = new JSZip();
        resolvedCompFilesContent.map((file: any)=>{
          zip.file(file.fileName, file.fileBlob);
        })
        zip.generateAsync({type: 'blob'}).then( (content) => {
          saveAs(content, 'exportedComponents.zip');
        });
      })
    }
  }

  processTemplate<Promise>(comp: any) {
    let compObj = comp;
    return new Promise((resolve, reject) => {
      let url = `/assets/templates/${compObj.name}Template.txt`;
      this.http.get(url, { responseType: 'text' }).subscribe({
        next: (templateContent: any) => {
          let templateString = templateContent;
          let templates = templateContent.match(/(\$\{)(.*?)(\})/g)
          let len = templates ? templates.length : 0;
          if(templates && templates.length) {
            templates.forEach((str: string,index: number) => {
              let replacer = str.replace('${', '');
              replacer = replacer.replace('}', '');
              templateString = templateString.replace(str,compObj.metaData.additionals[replacer]);
            })
          }
          resolve({template: templateString, name: compObj.name});
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
}
