import { useEffect } from 'react'

function Square() {
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

    return (
        <div className="ad-song-p1">
            <ins className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client="ca-pub-6719876622039428"
                data-ad-slot="9888136106"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div >
    )
}

export default Square