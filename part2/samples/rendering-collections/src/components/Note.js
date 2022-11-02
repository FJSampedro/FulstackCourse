const Note = ({note}) => {
    //{note} crea una variable de nombre 'note' dentro de la funcion
    //con el parametro .note del objeto props
    return (
      <li>{note.content}</li>
    )
  }

  export default Note