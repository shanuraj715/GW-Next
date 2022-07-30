import {AudioContext} from '/Store'

const Audio = (props) => {

    const [isPlaying, setIsPlaying] = useState(false)

    const dataToExport = {
        isPlaying,
        setIsPlaying
    }

    return <AudioContext.Provider value={dataToExport}>
        {props.children}
    </AudioContext.Provider>
}

export default Audio