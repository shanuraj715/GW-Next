import { useEffect } from 'react'
import { ENV } from '/constants'

function Ad320x50() {

    const loadAd = () => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            // console.log("adsense error", error.message);
        }
    }

    useEffect(() => {
        if (ENV === 'prod') loadAd();
    }, [])

    return ENV === 'prod' && <div>
        <ins className="adsbygoogle"
            style={{ display: 'inline-block', width: '320px', height: '50px' }}
            data-ad-client="ca-pub-6719876622039428"
            data-ad-slot="5057563594"></ins>
    </div>

}

export default Ad320x50