import { useEffect } from 'react'

function Horizontal() {

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
        loadAd();
    }, [])

    return <div className="ad-horizontal">
        <div>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client="ca-pub-6719876622039428"
                data-ad-slot="3801703586"></ins>
        </div>
    </div>

}

export default Horizontal