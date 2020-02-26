# React | Lifecycle methods

<br>

### Create the project and the file structure

```bash
# Create the react project
npx create-react-app react-lifecycle-methods

cd react-lifecycle-methods

# Create the directory for components
mkdir src/components

# Create a component file
touch src/components/Clock.js
```

<br>

## Lifecycle Methods

As your application runs, React is constantly creating and deleting components in memory.

Each `class` component goes through different phases in its **lifecycle**:

These **3** phases are:

    -	**I** - **Mounting** ( component creation )
    -	**II** - **Updating**
    -	**III** - **Unmounting** (when component is finally destroyed).

Lifecycle methods are special methods available in `class` components, automatically called by React when our component is **Mounting** or **Updating** or **Unmounting**.

We place our code in the lifecycle methods in order to run it in a certain phase.

## [React Lifecycle Methods Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- [ ]

### In Short

Lifecycle methods are special methods that are called automatically by React during the different stages of life of one component.

These methods exist only in (**stateful components**) **class components**.

They are also reffered to as **lifecycle hooks.** (Different than the new **[React Hooks API](https://www.fullstackreact.com/articles/an-introduction-to-hooks-in-react/)**)

- [ ]

<br>

## Brake down of Phases and explanation

### I - Mounting or First Render

These methods are called in the following order when an instance of a component is created and inserted into the DOM:

1. **`constructor()`**
2. **`render()`**
3. **`componentDidMount()`**

#### `constructor` - [Example - gist](https://gist.github.com/ross-u/ce9f84d3f6e2f5b16e52dfb378cf84e0)

###### `rce` + `Tab`

<br>

##### `components/Clock.js`

```jsx
import React from "React";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2020
    };

    console.log("1 - IN CONSTRUCTOR");
  }

  // custom methods and lifecycle methods go after the `constructor`- e.g. `render()`

  render() {
    return (
      <div>
        <h1>Clock</h1>
      </div>
    );
  }
}
```

- We use it when we want to pass `props` to the class component.
- By default it must contain `super` keyword, that receives `props` as argument from `constructor`
- If we are setting the `state` in `constructor` we have to use `this` keyword
- We can use it to `bind()` value of `this` to the methods
- **If we don’t initialize `state` from props and we don’t bind methods, we don’t need to implement a constructor for our React component.**

- [ ]

#### `render()` - [Example - gist](https://gist.github.com/ross-u/820a3fa9f7099c47e0d6f390f86c6f60)

```jsx
// ...

class Clock extends React.Component {
  constructor(props) {
    // ...
  }

  /* ▩ custom methods and lifecycle methods go after the `constructor` ▩*/

  render() {
    console.log("2 - IN RENDER");
    {
      /* ADD */
    }

    return (
      <div>
        <h1>Clock</h1>
        <h2>Year</h2> {/* ADD */}
        <p>{this.state.year}</p> {/* ADD */}
      </div>
    );
  } // ⮕ After`render` is done  the React component “mounts” to the DOM.
}
```

- The `render()` method is the next in line lifecycle method called right after the `constructor`
- `render()` is the only <u>required method</u> in a `class` component
- The `render()` function should be pure, meaning that it does not modify component's `state`.
- This method structures and prepares the JSX, and returns React elements.
- After the `render` is done the React component “mounts” onto the DOM.

* [ ]

#### `componentDidMount()` - [Example - gist](https://gist.github.com/ross-u/4edd1ccc2edf70919df3400fac831dc6)

```jsx
//	...

class Clock extends React.Component {
  constructor(props) {
    // ...
  }

  // custom methods and lifecycle methods go after the `constructor`

  componentDidMount() {
    // <-- ADD
    /* our code to run after `render()` is finished 
		and component is mounted onto the DOM */

    console.log('3 - IN "COMPONENT DID MOUNT"'); // <-- ADD
  }

  render() {
    console.log("2 - IN RENDER");

    return (
      <div>
        <h1>Clock</h1>

        <h2>Year</h2>
        <p>{this.state.year}</p>
      </div>
    );
  }
  // ⮕ After`render` is done  the React component “mounts” to the DOM.
}
```

<br>

- `componentDidMount()` is called immediately after component `render()` , after the component is mounted (inserted into the DOM).

* Since the `render()` method is already executed, **DOM will be already present**. Which means that we can reference DOM and our component inside `componentDidMount()`.

- We **shouldn't call `setState()`** here since this will lead to re-rendering of the component (causes performance issues).

<br>

### The `componentDidMount` methods is commonly used to set the inital `state` of the class components.

<br>

#### Let's use `componentDidMount` to set the inital `state` of the `Clock` and see how this is usually done.

##### `App.js`

```jsx
//	...

//			...


			{
          this.state.showClock
             ? <Clock currentYear={2020}/> 		{/* UPDATE - TO PASS THE PROP */}
             : null
      }


//	...
//			...
```

<br>

##### `components/Clock.js`

```jsx
//	...

class Clock extends React.Component {
  constructor(props) {
    	// ...
  };



  componentDidMount() {																// <-- UPDATE CODE IN C.D.M
		//	...

    console.log('3 - IN "COMPONENT DID MOUNT"');

    this.setState({ year: this.props.currentYear });				// <-- ADD SET STATE
  }
```

<br>

- [ ]

# II - Updating

An update phase is caused by **changes of the `props` or `state`**.

Update phase is initiated my passing new `props`, `setState()` or `forceUpdate()`.

**_Mounting_** phase happens **only once** - <u>when component is created</u>.

**_Updating_** phase happens **every time when** there is a **change of the `state` or the `props`.**

##### These methods are called in the following order when a component is updated:

- **`render()`** - Invoked by **default** each time an update happens (new `props`, `setState` or `forceUpdate`)

* **`componentDidUpdate()`**

<br>

### `render()` (Update phase)

#### Update the `<Clock />` with the new `props`.

##### `components/Clock.js`

```   jsx
// ...

class Clock extends React.Component {
    //	...

  		//	...



  render() {
    //	...

    //			...

      <div>
        {/*

        	...
        			...

       	*/}

        <h2>Current Time</h2>										{/* 	<-- ADD AT THE BOTTOM  	*/}
        <p>
          {                                      {/* 	<-- ADD  	*/}
            this.props.currentTime
              ? this.props.currentTime
              : 'LOADING'
          	}
        </p>

        {/* We will pass the currentTime by clicking the button in <App /> */}
      </div>
    );
  }
}
```

<br>

#### Create a method for updating time and pass time as the prop to the `<Clock />`

##### `App.js`

```jsx
//	...

//				...

//			CREATE A METHOD TO UPDATE TIME IN THE STATE OF  App
updateTime = () => {
  const currentTime = new Date().toUTCString();
  this.setState({ currentTime });
};

//	...

//			...

<button onClick={this.updateTime}> UPDATE TIME </button>; // <-- ADD A BUTTON

{
  this.state.showClock ? (
    <Clock currentYear={2020} currentTime={this.state.currentTime} />
  ) : null;
}
{
  /*   ^ ^ ^     PASS NEW PROP    ^ ^ ^   */
}
```

<br>

- [ ]

#### `componentDidUpdate()` - [Example - gist](https://gist.github.com/ross-u/6d5c2ca9fa75f5815b547baee440f84c)

##### `components/Clock.js`

```jsx
// ...

class Clock extends React.Component {
  constructor(props) {
    //	...
  }

  componentDidMount() {
    //	...
  }

  componentDidUpdate(prevProps, prevState) {
    //	U2			// <-- ADD
    /* code to run after the update happens via  
		passing new `props`, 
		or by calling the `setState` or `forceUpdate`  */

    console.log('IN "COMPONENT DID UPDATE"');
  }

  render() {
    // ...
  }
}
```

- `componentDidUpdate()` is invoked only during the **_updating_** phase, immediately after the re`render()` is finished.
- We **_shouldn’t update the state_** in `componentDidUpdate()`. <u>This can cause infinite loop</u> if the proper condition is not set, and it causes an extra re-rendering (affects component performance).
- `componentDidUpdate()` gives us access to the `props` and `state` from when before the update was made( `componentDidUpdate(prevProps, prevState)` ).
- In `componentDidUpdate()` can do a comparison of `prevProps` and `prevState` versus current`this.props` and `this.state`.to see what exactly changed (if anything) and then react accordingly.

**Example**

```jsx
// Check if new props are passed

componentDidUpdate(prevProps) {
   console.log('IN "COMPONENT DID UPDATE"');

  // Typical usage - comparing value of the new props:
  if (prevProps.currentTime !== this.props.currentTime) {
    console.log('   RECEIVED NEW PROPS ! ! !');
  }
}
```

- [ ]

<br>

## III - Unmounting

**`componentWillUnmount()`** is invoked immediately before a component is unmounted and destroyed (removed from the DOM).

**Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, like for example stopping `setInterval()` timers before the component gets destroyed and prevent memory leaking .**

You **should not call setState()** in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

### [Gist example - `componentWillUnmount()`](https://gist.github.com/ross-u/38fa3558155234faf453e6730755759a)

<br>

##### `components/Clock.js`

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2020,
      timerId: null,                  //		<-- CREATE NEW PROPERTY
      timer: 0,                           //		<-- CREATE NEW PROPERTY
    };

  }




  updateTimer = () => {                         //		<-- CREATE NEW METHOD
    this.setState({ timer: this.state.timer + 1 });
  };





	//	UPDATE THE CODE IN THE componentDidMount()

  componentDidMount() {
    console.log('IN "COMPONENT DID MOUNT"');

    const timerId = setInterval(this.updateTimer, 1000);   // <-- CREATE AN INTERVAL
    this.setState({ year: this.props.currentYear, timerId }); // <-- SET timerId
  }


	//		...

	//				...



	// ADD THE LIFECYLCLE METHOD  `componentWillUnmount()`
	// CLEAR THE TIMEOUT BEFORE THE COMPONENT IS DESTROYED

  componentWillUnmount() {                                    // <-- ADD
    console.log('\n XXX  IN "COMPONENT WILL UNMOUNT"  XXX');
    clearTimeout(this.state.timerID);                         // <-- ADD
  }


  render() {
    //	...

    //			...


        <h2>Timer: {this.state.timer} </h2>                   {/*    <--  ADD       */}

```

<br>

## [Lifecycle methods Exercise](https://gist.github.com/ross-u/dade01d6a7e03f2aa064383d6515567a)

<br>

# Additional (Rarely Used) Lifecycle Methods

The first diagram shows **the most used lifecycle methods** but besides these you should now that there are the other ones, maybe not as often used, but important ones.

Let’s check the **extended diagram** below:

#### [DIAGRAM - check the box "Show less common lifecycles"](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

Let's update each lifecycle phase including these methods:

## I - Mounting:

1. **constructor()**
2. \*~~componentWillMount()~~ => <span style="color: purple">**getDerivedStateFromProps()**</span>
3. **render()**
4. **componentDidMount()**

#### `UNSAFE_componentWillMount()`

`componentWillMount()` - is considered **UNSAFE** method. You will notice the `UNSAFE` prefix added to it.

#### `getDerivedStateFromProps()`

`getDerivedStateFromProps()` - the next method to be executed after the `constructor()`

it replaces the `UNSAFE_componentWillMount`)

##### [`UNSAFE_componentWillMount()`](https://reactjs.org/docs/react-component.html#unsafe_componentwillmount)

## II - Updating:

1. <span style="color: purple"> **getDerivedStateFromProps()**</span>
2. <span style="color: purple">**shouldComponentUpdate()**</span>
3. **render()**
4. <span style="color: purple">**getSnapshotBeforeUpdate()**</span>
5. **componentDidUpdate()**

### `shouldComponentUpdate()` -

**[`shouldComponentUpdate()`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)**- is the only lifecycle method that **returns `true` or `false`**

**If it returns `false`, the `render()` method gets canceled**.

Here you can implement some logic to stop a re-render if it’s not necessary so your app will do less work.

### `getSnapshotBeforeUpdate()`

**`getSnapshotBeforeUpdate()`** is invoked right before the most recently rendered output is committed to the DOM.

Any value returned by **`getSnapshotBeforeUpdate()`** is passed as a parameter to **`componentDidUpdate()`**.

## [COMPLETE LECTURE NOTES AND EXAMPLES](https://gist.github.com/ross-u/4c6ca7e15eb713cb158bfaee88ace8eb)

### Reference

[State and Lifecycle - React Docs](https://reactjs.org/docs/state-and-lifecycle.html)

[`constructor()`](https://reactjs.org/docs/react-component.html#constructor)

[`render()`](https://reactjs.org/docs/react-component.html#render)

[`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount)

[`setState()`](https://reactjs.org/docs/react-component.html#setstate)

[`forceUpdate()`](https://reactjs.org/docs/react-component.html#forceupdate)

[`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate)

[componentWillUnmount()](https://reactjs.org/docs/react-component.html#componentwillunmount)

<br>

### Extra Resorurces

[React - rfcs docs](https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md)

[These are the concepts you should know in React.js (after you learn the basics)](https://medium.freecodecamp.org/these-are-the-concepts-you-should-know-in-react-js-after-you-learn-the-basics-ee1d2f4b8030)

[Understanding React v16.4+ New Component Lifecycle Methods](
