module.exports = (serviceContent) => `
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class compDataService {
    ${serviceContent}
}
`