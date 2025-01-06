import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../components/Icons/PlusIcon'
import { ShareIcon } from '../components/Icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'

function Dashboard() {
    const [modal, setModal] = useState(false)
    return (
        <div className='flex'>
            <Sidebar />
            <div className='p-4 w-full min-h-screen bg-gray-200'>
                <CreateContentModal open={modal} onClick={() => {
                    setModal(false)
                }} />
                {/* <Button variant={"primary"} size={"sm"} text={"Heelo"} onClick={() => { }} startIcon={<PlusIcon />} />
      <Button variant={"primary"} size={"md"} text={"Heelo"} onClick={() => { }} startIcon={"+"} />
      <Button variant={"secondary"} size={"lg"} text={"Heelo"} onClick={() => { }} startIcon={"+"} /> */}
                <div className='flex justify-end gap-4'>

                    <Button width='normal' variant={"primary"} text={"Add content"} startIcon={<PlusIcon size={"size-4"} />} onClick={() => { setModal(true) }} />
                    <Button width='normal' variant={"secondary"} text={"Share Brain"} startIcon={<ShareIcon size={"size-4"} />} />
                </div>
                <div className='flex gap-3'>

                    <Card type={"twitter"} link={"https://x.com/AJITHPKUMAR3/status/1872304992482435459"} />
                    <Card type={"youtube"} link={"https://www.youtube.com/watch?v=zL4cULLyBJY"} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
