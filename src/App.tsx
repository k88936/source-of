import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from "@jetbrains/ring-ui-built/components/button/button";
import alertService from "@jetbrains/ring-ui-built/components/alert-service/alert-service";

function App() {

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Button onClick={() => alertService.successMessage('Hello world')}>
                    Click me
                </Button>        <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
