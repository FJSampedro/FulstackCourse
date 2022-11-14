const Language = ({language }) => {
    return (
        <li> {language} </li>
    )
}
const ShowLanguageList = ({ languages }) => {
    console.log(languages);
    return (
        <ul>
            {Object.keys(languages).map(key => <Language key={key} language={languages[key]} />)}
        </ul>
    )
}
export default ShowLanguageList