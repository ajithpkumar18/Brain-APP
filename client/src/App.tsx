import './App.css'
import { PlusIcon } from './components/Icons/PlusIcon'
import { Button } from './components/ui/Button'

function App() {

  return (
    <>
      <Button variant={"primary"} size={"sm"} text={"Heelo"} onClick={() => { }} startIcon={<PlusIcon />} />
      <Button variant={"primary"} size={"md"} text={"Heelo"} onClick={() => { }} startIcon={"+"} />
      <Button variant={"secondary"} size={"lg"} text={"Heelo"} onClick={() => { }} startIcon={"+"} />
    </>
  )
}

export default App
