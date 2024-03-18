## 1. Create a New Angular Project

To create a new Angular project, you'll first need to open the Terminal or Command Prompt. Once open, navigate to the directory where you'd like to create your new projet'[lrktoerjipogargadfgdfgdfgdfgct.

Here's the command you'll use to generate a new Angular project:

```bash
ng new course-type-crud
```sfdgsdfgdsf

The `ng new` cogdsfgmmand is used to create a new Angular project, and `course-type-crud` is the name of the project.
dfgsdfg
After running the command, the Angular CLI (Command Line Interface) will prompt you with a series of questions:

1. **Would you like to add Angular routing?** Type `y` (for yes) or `n` (for no). In this case, type `y` because we will be setting up routdsfgsdfging in this application.
2. **Which stylesheet format would you like to use?** You can select CSS or any preprocessor you're comfortable with. For this project, you can choose `CSS`.
fdgdsg
After you've answered the questions, Angular CLI will take a few moments to generate the necessary files and install the dependencies. 

Once the project generation process is comsdfgsdfgdsfgplete, navigate into your new project's directory using the following command:

```bash
cd course-type-crud
```

Now, you can open the project in VS Code by typing the following command:sdfgsdfgdsfgdsfgsd

```bash
code .
```

This command will open the current directory in VS Code. If the command doesn't work, you might need todfgsdfg [install the `code` command in PATH](https://code.visualstudio.com/docs/setup/setup-overview).

Now that you've successfully created an Angular project, you're ready to start building your CourseType CRUD application.
dfgdsfgsdfg

## 2. Define the Data Model

In Angular, we often use interfaces to define data models. An interface is a TypeScript language feature which lets you define the shape of an object. Here, we'll create a `CourseType` interface.

First, you'll need to create a new folder named `models` inside the `src/app` directory. In the `models` folder, create a new file named `course-type.model.ts`.

The `course-type.model.ts` file should look like this:
sdfgdsfgsdfgdsg
```typescript
export interface CourseType {
  CourseTypeId: number;
  Description: string;
  IsDeleted: boolean;
}
```

This is how we interpret the above interface:
- `CourseTypeId` is a numeric identifier for the course type.
- `Description` is a string that gives a brief description about the course type.
- `IsDeleted` is a boolean to keep track if the course type has been deleted.

With this, we have defined the structure for a CourseType object. Any object declared with type `CourseType` must adhere to this structure. 

This approach provides a consistent way of interacting with course type data throughout our application and allows us to leverage TypeScript's strong typing.

## 3. Create the Service

Services in Angular are a great way to share information among classes that don't know each other. They are generally used when you need to process data and keep Angular components lean, delegating data management tasks to services. In our application, we'll use a service to manage the CourseType data.

As you requested, we'll also need to create some fake data because the API does not exist yet. Angular services are perfect for this task because they can simulate the behavior of an actual API.

First, you need to create a new service using the Angular CLI command:

```bash
ng generate service services/courseType
```

The `ng generate service` command is used to create a new service. `services/courseType` is the location where the service will be created. The command will create a new folder called `services` in the `src/app` directory, with a `course-type.service.ts` file within it.

Open the `course-type.service.ts` file, you'll see a basic, empty service that looks like this:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  constructor() { }

}
```

Now we need to add the fake data and methods for the CRUD operations. Import the `CourseType` interface at the top of your file like so:

```typescript
import { CourseType } from '../models/course-type.model';
```

Next, add the following code to your `CourseTypeService`:

```typescript
import { Injectable } from '@angular/core';
import { CourseType } from '../models/course-type.model';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  // Array to hold CourseType items
  courseTypes: CourseType[] = [
    {
      CourseTypeId: 1,
      Description: 'Online',
      IsDeleted: false
    },
    {
      CourseTypeId: 2,
      Description: 'Offline',
      IsDeleted: false
    }
    // Add more CourseType items as needed
  ];

  constructor() { }

  // Method to get all CourseTypes
  getAll(): CourseType[] {
    return this.courseTypes.filter(x => x.IsDeleted === false);
  }

  // Method to get a CourseType by id
  get(id: number): CourseType {
    return this.courseTypes.find(x => x.CourseTypeId === id && x.IsDeleted === false);
  }

  // Method to create a new CourseType
  create(courseType: CourseType) {
    courseType.CourseTypeId = Math.max(...this.courseTypes.map(x => x.CourseTypeId)) + 1;
    this.courseTypes.push(courseType);
  }

  // Method to update a CourseType
  update(courseType: CourseType) {
    const index = this.courseTypes.findIndex(x => x.CourseTypeId === courseType.CourseTypeId);
    if (index > -1) {
      this.courseTypes[index] = courseType;
    }
  }

  // Method to delete a CourseType
  delete(id: number) {
    const courseType = this.get(id);
    if (courseType) {
      courseType.IsDeleted = true;
    }
  }
}
```

In the `CourseTypeService`, we have:

- An array of `CourseType` items to act as our in-memory database.
- A `getAll()` method to get all non-deleted CourseType items.
- A `get(id: number)` method to fetch a single CourseType item by its `CourseTypeId`.
- A `create(courseType: CourseType)` method to add a new CourseType item to the array. Note that we are generating the `CourseTypeId` by finding the

 maximum current `CourseTypeId` and adding 1.
- An `update(courseType: CourseType)` method to update an existing CourseType item in the array.
- A `delete(id: number)` method to set the `IsDeleted` property of a CourseType item to `true`.

Now, our service is ready. It provides the methods our components need to manage CourseType data. This service can be easily replaced in the future with a real API without changing the components that use it. This is a great advantage of using services and shows the benefits of separation of concerns, where each part of the application only knows and is responsible for its specific task.

## 4. Create the Components

Instead of creating multiple components for different operations, we will build a single component that will encapsulate the functionalities of creating, reading, updating, and deleting the CourseTypes. This approach will help students understand how different operations interact within a single component. Let's call this component `CourseTypeComponent`.

### 4.1. CourseTypeComponent

Run the following command to create the CourseTypeComponent:

```bash
ng generate component components/CourseType
```

This command creates a new directory named `CourseType` within the `components` folder, containing four files:

1. `course-type.component.css`: For styling our component.
2. `course-type.component.html`: For laying out our component.
3. `course-type.component.spec.ts`: For testing our component.
4. `course-type.component.ts`: For writing our component's logic.

In `course-type.component.ts`, we'll inject our `CourseTypeService` to get all the CourseTypes and to provide functionality to add, update, and delete CourseTypes:

```typescript
import { Component, OnInit } from '@angular/core';
import { CourseType } from '../../models/course-type.model';
import { CourseTypeService } from '../../services/course-type.service';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {
  courseTypes: CourseType[] = [];
  currentCourseType: CourseType = null;
  isEditing = false;

  constructor(private courseTypeService: CourseTypeService) { }

  ngOnInit(): void {
    this.courseTypes = this.courseTypeService.getAll();
  }

  selectCourseType(courseType: CourseType): void {
    this.currentCourseType = { ...courseType };
    this.isEditing = false;
  }

  createCourseType(description: string): void {
    const newCourseType: CourseType = {
      CourseTypeId: this.courseTypes.length + 1,
      Description: description,
      IsDeleted: false
    };
    this.courseTypeService.create(newCourseType);
    this.courseTypes = this.courseTypeService.getAll();
  }

  updateCourseType(): void {
    this.courseTypeService.update(this.currentCourseType);
    this.courseTypes = this.courseTypeService.getAll();
  }

  deleteCourseType(): void {
    this.courseTypeService.delete(this.currentCourseType.CourseTypeId);
    this.courseTypes = this.courseTypeService.getAll();
  }

  startEditing(): void {
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }
}
```

Here, `courseTypes` will hold all the CourseTypes we get from our service. `currentCourseType` is the CourseType that the user selected for viewing, updating, or deleting. `isEditing` will be used to toggle between displaying the details of `currentCourseType` and editing its details.

`selectCourseType` allows the user to select a CourseType to view its details. `createCourseType` creates a new CourseType and adds it to our list of CourseTypes. `updateCourseType` updates the details of `currentCourseType`. `deleteCourseType` deletes `currentCourseType` from our list of CourseTypes. `startEditing` and `cancelEditing` toggle `isEditing` to switch between viewing and editing `currentCourseType`.

In `course-type.component.html`, we'll lay out our CourseType operations:

```html
<h1>Course Types</h1>

<ul>
  <li *ngFor="let courseType of courseTypes" (click)="selectCourseType(courseType)">
    {{ courseType.Description }}
  </li>
</ul

>

<h2>Create Course Type</h2>
<label>
  Description:
  <input #newDescription>
</label>
<button (click)="createCourseType(newDescription.value)">Create</button>

<div *ngIf="currentCourseType">
  <h2>Selected Course Type</h2>
  <p>{{ currentCourseType.Description }}</p>

  <div *ngIf="isEditing">
    <h2>Edit Course Type</h2>
    <label>
      Description:
      <input [(ngModel)]="currentCourseType.Description">
    </label>
    <button (click)="updateCourseType()">Update</button>
    <button (click)="cancelEditing()">Cancel</button>
  </div>

  <button (click)="startEditing()">Edit</button>
  <button (click)="deleteCourseType()">Delete</button>
</div>
```

Here, we are listing all CourseTypes. Clicking on a CourseType will select it. We have a form to create new CourseTypes. When a CourseType is selected, its details are displayed. The user can choose to edit or delete the selected CourseType. If the user chooses to edit, a form with the CourseType's details will be displayed.

This single component approach simplifies our application structure by combining all CRUD operations into one component. It reduces the need for component-to-component communication and makes our application easier to understand and maintain.

## 5. Add Routing

Routing in Angular helps to navigate between different components based on the URL in the browser. We will add routing to our application so that we can navigate to our `CourseTypeComponent`.

### 5.1. Setting Up Routing

First, let's set up routing for our application. In the `app.module.ts` file, import the `RouterModule` and `Routes` from `@angular/router`:

```typescript
import { RouterModule, Routes } from '@angular/router';
```

Next, we define our routes. A route is an array of `Route` objects. Each `Route` object maps a URL path to a component. Since we are working with only one component, we'll map the path for our `CourseTypeComponent`. Add the following code in `app.module.ts`:

```typescript
const routes: Routes = [
  { path: 'coursetypes', component: CourseTypeComponent },
  { path: '', redirectTo: '/coursetypes', pathMatch: 'full' }
];
```

Here, we are telling Angular to display the `CourseTypeComponent` when the URL is `/coursetypes`. The second route is a redirect route. It redirects the default route (`''`) to `/coursetypes`, so that when the application starts, it automatically navigates to `CourseTypeComponent`.

Now, we need to register these routes with our application. Still, in `app.module.ts`, add `RouterModule.forRoot(routes)` to the `imports` array in the `@NgModule` decorator:

```typescript
imports: [
  BrowserModule,
  FormsModule,
  RouterModule.forRoot(routes)
],
```

### 5.2. Adding RouterOutlet

Now that we have our routes set up, we need to tell Angular where to display the components for our routes. This is done using the `router-outlet` directive. Open `app.component.html` and replace its content with the following:

```html
<router-outlet></router-outlet>
```

### 5.3. Adding RouterLink

Lastly, we will add a `routerLink` to navigate to our `CourseTypeComponent`. For this example, we will add the link in `app.component.html`. Replace its content with the following:

```html
<h1>Welcome to our Course Type Application</h1>

<nav>
  <a routerLink="/coursetypes">Manage Course Types</a>
</nav>

<router-outlet></router-outlet>
```

Here, `routerLink` is used to link to our `CourseTypeComponent`. When we click the link, the URL changes to `/coursetypes`, and `CourseTypeComponent` is displayed.

With this, we have set up routing in our application. We can now navigate to our `CourseTypeComponent` where we can create, read, update, and delete CourseTypes.
