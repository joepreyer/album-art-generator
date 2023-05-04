import { useEffect, useState } from 'react'
import Mash from '@getmash/client-sdk'

export type UseMashProps = {
    access: (pricingCategoryTag: string) => Promise<boolean>
    isInitializing: boolean
    isRequesting: boolean
}

export function useMash(earnerID: string) {
    const [isInitializing, setIsInitializing] = useState(true)
    const [isRequesting, setIsRequesting] = useState(false)
    const [client, setClient] = useState<Mash>()

    useEffect(() => {
        const mash = new Mash({ earnerID })
        setClient(mash)
        mash.init()
            .then(() => {
                setIsInitializing(false)
            })
            .catch((error) => {
                console.error('Error initializing mash', error)
            })
    }, [earnerID])

    // Wrap the Mash SDK's access function to track loading state
    const access = async (pricingCategoryTag: string) => {
        setIsRequesting(true)
        let hasAccess = false
        try {
            hasAccess = (await client?.access(pricingCategoryTag)) ?? false
        } catch (error) {
            console.error('Error accessing mash', error)
            throw new Error('An error occurred while accessing Mash')
        } finally {
            setIsRequesting(false)
        }
        return hasAccess
    }

    return { access, isInitializing, isRequesting }
}
