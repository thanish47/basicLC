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
        this.packageFilesFoldersAsZip(resolvedTemplates)
      })
    }
  }

  packageFilesFoldersAsZip(filesMap: any) {
   if(filesMap && filesMap.length) {
    var zip = new JSZip();
    filesMap.map((fileContent: any)=>{
      zip.folder(fileContent.name);
      zip.file(fileContent.name+'/'+fileContent.name+'.component.ts', new Blob([fileContent.jsTemplate], { type : 'text/javascript' }))
      zip.file(fileContent.name+'/'+fileContent.name+'.component.html', new Blob([fileContent.htmlTemplate], { type : 'text/html' }))
      zip.file(fileContent.name+'/'+fileContent.name+'.component.css', new Blob([fileContent.cssTemplate], { type : 'text/css' }))
    })
    zip.generateAsync({type: 'blob'}).then( (content) => {
      saveAs(content, 'exportedComponents.zip');
    });
   }      
  }

  processTemplate<Promise>(comp: any) {
    let compObj = {...comp};
    return new Promise((resolve, reject) => {
      let url = `/assets/templates/${compObj.name}Template.txt`;
      this.http.get(url, { responseType: 'text' }).subscribe({
        next: (templateContent: any) => {
          let templateString = templateContent;
          let templates = templateString.match(/(\$\{)(.*?)(\})/g)
          let len = templates ? templates.length : 0;
          if(templates && len) {
            templates.forEach((str: string,index: number) => {
              let replacer = str.replace('${', '');
              replacer = replacer.replace('}', '');
              templateString = templateString.replace(str,compObj.metaData.additionals[replacer]);
            })
          }
          let fileStrings = templateString.split('########');
          resolve(
            {
              jsTemplate: fileStrings[0],
              htmlTemplate: fileStrings[1],
              cssTemplate: fileStrings[2],
              name: compObj.metaData.additionals.selector
            }
          );
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
}
