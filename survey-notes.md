# React Hooks

## 01: useState
State variable in React: data that changes over time  
Input to useState hook: initial state variable value  
Return values of useState hook: 
1. state value variable 
2. state setter function (used to trigger a UI rerender, displaying a state variable change)  

## 02: useEffect
useEffect hook is used to run side effects  
Input to useEffect hook: 
1. a execution function to perform the side effect
2. a list of dependencies to watch for changes to invoke the execution function

Passing a function as the initial value to useState performs "lazy" initialization - function will only be executed once on initial render  
Creation of custom hooks - functions that use hooks to implement logic  

## 03: Lifting State
To share state between sibling components the state and state managers can be lifted to the closest common parent and provided to each child as props  
To colocate state and its managers means to define it as close to where it is used as possible  
