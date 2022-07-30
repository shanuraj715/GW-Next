import {UserContext} from '/Store'

const User = (props) => {

    const [isLogged, setIsLogged] = useState(false)

    const dataToExport = {
        isLogged,
        setIsLogged
    }

    return <UserContext.Provider value={dataToExport}>
        {props.children}
    </UserContext.Provider>

}

export default User