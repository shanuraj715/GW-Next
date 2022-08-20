import {useRouter} from 'next/router'
import { useEffect } from 'react'
import {APP_INFO} from '/constants'

function AdminPanel(){
    const router = useRouter()
    useEffect(() => {
        router.replace(APP_INFO.ADMIN_PAGE)
    })
}

export default AdminPanel