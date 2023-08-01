# Low Code Platform Basic Studio 

## What it is?
This is a low code platform to deliver the functional components or Page level components as independent functional units that are UI Framework specific. This project will have multiple modules that shall be independently developed to complement each other..!

First in this series is the Studio application, with a playground that is WYSIWYG. The flow starts with drag and drop of the UI components to configure its functional behavior, data source, styling aspects, localisation etc. And next by exporting the componets as metadata in JSON format which captures the required details of the components to generate the code of the component.

Second in this series is the Generator application, which shall take the metadata JSON exported from Studio application and generates the code as package that can either be consumed as a library as npm or Yarn module, or can be downloaded as zip packages to directly be consumed by the developer.

There shall be multiple such generators, each generator application targeted to generate a JS framework specific code, like Web Components version, Angular version React version, VueJs version, Svelte Kit version!

## It's Story
This Project is an evolving story to built a low code platform that is developer centric and is very generic. This is started as an assignment from one of my Guru, to serve as a testimonial of my portfolio outside my professional work. Added is my desire to contribute something to the developer community, in my own way. 

The output of this project shall be made available to developers to consume freely in their applications, to serve as a base and further modify for handling any business specific complexities.

### Timeline
##### Nascent Phase:
 As of now the studio application is at very nascent stages and has been started with Tree list and Tree Graph components. It shall provide basic ability to configure couple of components and directly export the components added to the basket in Studio app as Stand alone angular components, in a zip file. This is to complete the flow and set the stage to envision and see the big picture.

### Practitioner phase
 The studio application will now be decoupled to generate metadata JSON and the angular specific code generator will be moved to a seperate application. Continue to make the Studio application and Generator application more robust and mature.
 
 We will also add more functionality to complete functional flow of studio application. The list of components shall be expanded. The scope shall be expanded to include higher order components connecting multiple components and page layout components. 

By the end of this phase, the studio application should be able to cover functional and page level components, styling aspects of them, multi level components and the communication flows between components! However, it shall support only to generate the Angular components alone.

### Expansion phase
During this phase, the time shall be spent on expanding support for more JS frameworks React, Vuew, Svelte and Web Components. Time shall also be spent on supporting more UI components libaries like Material for Angular, MUI for React, and other open source libraries that offer full set of components, including Charting libraries based on d3.js, chart.js etc

### Conclusion phase
Support from here on will be provided on mainly 3 aspects:
- updating the existing generators to export latest versions of the libraries
- expanding support for more UI component libraries on Studio application. 
- Supporting on any issues found to battle-harden the generators.


## Technical Aspects:
This project is a full stack where the frontend of the Studio application is a SPA that runs on the latest Angular 16.1 version. 
And the backend application will run on Nest JS and MongoDB.


