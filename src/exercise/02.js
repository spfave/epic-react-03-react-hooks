// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Extra credit 3: create custom hook to use local storage
// Extra credit 4: generalize hook by serializing value when storing
function useLocalStorageState(
  storageKey,
  initialValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const lsValue = localStorage.getItem(storageKey)
    if (lsValue) return deserialize(lsValue)
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(storageKey, serialize(state))
  }, [storageKey, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  // Extra credit 1: lazy state initialization
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName,
  // )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // Extra credit 2: add useEffect dependency array
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  // Extra credit 3: use custom hook
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input id="name" value={name} onChange={handleChange} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
