import { useEffect, useState } from 'react'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '../components/Card'

function OtherDash() {
    console.log("OtherDash")
    const [modal, setModal] = useState(false)
    const [contents, setContent] = useState([]);
    const [name, setName] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    async function fetchData() {
        try {

            let data = await axios.get(`${BACKEND_URL}/api/v1/brain/${id}`)

            console.log(data.data)
            setName(await data.data.username)
            setContent(await data.data.content)
        }
        catch (e) {
            navigate("/notfound")
        }
        // if (data.data.data != null) {
        // } else {
        //     navigate("/notfound")
        // }
    }

    useEffect(() => {
        fetchData();

        let interval = setInterval(() => {
            fetchData();
        }, 10000)

        return () => { clearInterval(interval) }
    }, [])

    return (
        <div className='flex'>
            <Sidebar />
            <div className='p-4 w-full min-h-screen bg-gray-200'>
                <CreateContentModal open={modal} onClose={() => {
                    setModal(false)
                }} />
                <div className='flex justify-end gap-4 relative mb-5 mt-2'>
                    {name && <div className='right-2 text-purple-600 text-3xl border rounded-2xl tracking-wide border-white font-mono font-semibold px-3 pt-2 pb-3 text-center'>
                        Welcome to {name}'s Brain
                    </div>}
                </div>
                <div className='flex gap-3 flex-wrap'>
                    {contents != undefined && contents.map(({ type, link, title }) => <Card type={type} link={link} title={title} />)}
                </div>
            </div>
        </div>
    )
}

export default OtherDash
