// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

// Extra credit 4: create and use error boundary component
// class ErrorBoundary extends React.Component {
//   state = {error: null}

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return {error}
//   }

//   render() {
//     if (this.state.error) {
//       // Error fallback UI
//       return <this.props.fallbackComponent error={this.state.error} />
//     }

//     return this.props.children
//   }
// }

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // Extra credit 2: track component status and use for conditional render logic
  // const [status, setStatus] = React.useState('idle')
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)

  // Extra credit 3: store all state in a single object
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    data: {},
    error: null,
  })
  const {status, data, error} = state

  React.useEffect(() => {
    if (!pokemonName) return

    // setPokemon(null)
    // setError(null)

    // setStatus('pending')
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        // setPokemon(pokemonData)
        // setStatus('resolved')
        setState({status: 'resolved', data: pokemonData})
      })
      .catch(error => {
        // setError(error)
        // setStatus('rejected')
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  if (status === 'idle') return 'Submit a pokemon'
  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />
  // Extra credit 1: handle errors
  // Extra credit 4: handle error with error boundary component
  if (status === 'rejected')
    // return (
    //   <div role="alert">
    //     There was an error:{' '}
    //     <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    //   </div>
    // )
    throw error
  if (status === 'resolved') return <PokemonDataView pokemon={data} />
}

function PokemonFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* Extra credit 5: remount error boundary  */}
        {/* <ErrorBoundary key={pokemonName} fallbackComponent={PokemonFallback}></ErrorBoundary> */}
        {/* Extra credit 6: use react-error-boundary package */}
        {/* Extra credit 7: reset the react-error-boundary */}
        {/* Extra credit 8: user react-error-boundary reset keys feature */}
        <ErrorBoundary
          FallbackComponent={PokemonFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
