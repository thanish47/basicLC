import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmpDataService {
  data: any = {
    countries: {
      nodes: [
        {name: 'USA', key: 'usa', url:'usa'},
        {name: 'Australia', key: 'aus'},
        {name: 'Germany', key: 'ger'},
        {name: 'Norway', key: 'nor'},
        {name: 'Canada', key: 'can'},
      ],
    },
    newYork: {
      nodes: [
        {name: 'Brooklyn', key: 'brooklyn', url: 'brooklyn'},
        {name: 'Manhattan', key: 'manhattan'},
        {name: 'Bronx', key: 'bronx'},
        {name: 'Queens', key: 'queens'},
        {name: 'Staten Island', key: 'statenisland'},
      ],
    },
    usa: {
      nodes: [
        {name: 'New York', key: 'newYork', url:'newYork'},
        {name: 'Chicago', key: 'c'},
        {name: 'Los Angeles', key: 'la'},
        {name: 'Miami', key: 'm'},
        {name: 'Boston', key: 'b'},
      ],
    },
    brooklyn: {
      nodes: [
        {name: 'Williamsburg', key: 'williamsburg'},
        {name: 'Park Slope', key: 'parkslope'},
        {name: 'Fort Green', key: 'fortgreen'},
        {name: 'Flatbush', key: 'flatbush'},
        {name: 'Red Hook', key: 'redhook'},
      ],
    }
  }

  constructor() { }

  getData(key: string = 'countries') {
    if(this.data.hasOwnProperty(key)) {
      return this.data[key].nodes;
    } else {
      return [];
    }
  }
}
