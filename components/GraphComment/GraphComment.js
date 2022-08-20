import { useEffect } from 'react'
import getDeviceInfo from '/extra/GetDeviceInfo/GetDeviceInfo';
import Square from '/components/ads/Square'

export default function GraphComment() {

    const { width } = getDeviceInfo()

    const graphComment = () => {

        document.getElementById("graphcomment").innerHTML = ''
        var gc_params = {
            graphcomment_id: 'GaanaWorld',
            target: document.getElementById('#graphcomment'), // optional, #graphcomment by default

        };

        window.graphcomment(gc_params);
    }

    useEffect(() => {
        graphComment()
    }, [])

    return (
        <div className="d-flex justify-content-between flex-column flex-lg-row">
            {/* <div style={{flexGrow: '1'}}> */}
                <div id="graphcomment" style={{flexGrow: '1'}}></div>
            {/* </div> */}
            <Square />
        </div>
    )

}
