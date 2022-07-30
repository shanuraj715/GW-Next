import { useEffect } from 'react'

export default function GraphComment() {

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
        <div id="graphcomment"></div>
    )

}
