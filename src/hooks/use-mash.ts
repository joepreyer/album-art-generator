import { useEffect, useState } from 'react'

import Mash from '@getmash/client-sdk'

/**
 * A Mash SDK instance in hook form
 * @returns the Mash SDK client and state signalling if the SDK is in a loading state
 */
export default function useMash(earnerID: string) {
    const [isInitializing, setIsInitializing] = useState(true)
    const [isRequesting, setIsRequesting] = useState(false)
    const [client, setClient] = useState<Mash>()

    useEffect(() => {
        // Change this ID if you'd like to use your own Mash account
        const mash = new Mash({ earnerID: earnerID })
        setClient(mash)
        mash.init().then(() => {
            setIsInitializing(false)
        })
    }, [])

    // Wrap the Mash SDK's access function to track loading state
    const access = async (pricingCategoryTag: string) => {
        setIsRequesting(true)

        let hasAccess = false
        try {
            hasAccess = (await client?.access(pricingCategoryTag)) ?? false
        } finally {
            setIsRequesting(false)
        }

        return hasAccess
    }

    return { access, isInitializing, isRequesting }
}
