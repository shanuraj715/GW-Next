import { useEffect } from 'react'
import { ENV } from '/constants'

function HorizontalMini() {

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
        if(ENV === 'prod') loadAd();
    }, [])

    return ENV === 'prod' && <div className="horizontalMini">
        <ins className="adsbygoogle"
            style={{display: "block"}}
            data-ad-format="fluid"
            data-ad-layout-key="-gc+3r+68-9q-29"
            data-ad-client="ca-pub-6719876622039428"
            data-ad-slot="7276880598"></ins>
    </div>
}

export default HorizontalMini