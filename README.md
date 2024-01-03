# Low Code Platform Basic Studio 

## What is it?
This is a low code platform to deliver the functional components or Page level components as independent functional units that are UI Framework specific. This project will have multiple modules that shall be independently developed to complement each other..! Each module is a framework specific, and is developed in the same framework & uses the same code that it exports

The Studio application provides a playground which is a WYSIWYG enabling user to drag and drop the UI components onto it. Configuration section enables the user to configure the selected component's functional behavior, data source, styling aspects, localisation etc.  Once the configuration is tuned as required, next is to export the component, that generates the metadata in JSON format. This is further used by the generator that uses generator and the same component's code to generate the code of the component. This is the goodness of this application as the user would get the same code that he played with in the playground as the exported component, that are ready to be further customized or used, in to the existing application of the user.

There shall be multiple versions of this studio application that shall be developed in Angular, React.js, Vue.js and Svelte.

There shall be multiple such generators, each generator application targeted to generate a JS framework specific code, like Web Components version, Angular version React version, VueJs version, Svelte Kit version!

## It's Story
This Project is an evolving story to built a low code platform that is developer centric and is very generic. This started from my experiences as part of job where I am involved in development of a low code platform and interaction with couple of 3rd party accelerators. I have felt that these were mostly business centric and not developer centric. Additionally, some force to adapt their platform and stay with them for the app to work. While this project will help to serve as a testimonial of my portfolio outside my professional work. Added is my desire to contribute something to the developer community, in my own way. 

The output of this project shall be made available to developers to consume in their applications for free, to serve as a base and further modify for handling any business specific complexities.


## Technical Aspects:
This project is a full stack where the frontend of the Studio application is a SPA that runs on the latest Angular 16.1 version. 
And the backend application will run on Nest JS and MongoDB.


