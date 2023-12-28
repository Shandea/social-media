

const Form = (props) => {
  return (
    <form
     onSubmit={props.onSubmit}
     className={props.className}
     >
        {props.children}
        <button type="submit" className={props.btnClass} >{props.btnText}</button>
        <hr className="form-hr" />
        <button onClick={props.onClick} className={props.signup} type="button">Create New Account</button>
     </form>
  )
}

export default Form