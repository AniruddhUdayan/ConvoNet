import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'

const ProtectRoute = (children,user,redirect="/login") => {
    if (!user) {
        return <Link href={redirect} />
    }
    return children
}

export default ProtectRoute
