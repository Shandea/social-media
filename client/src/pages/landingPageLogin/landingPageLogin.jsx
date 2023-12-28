import Form from "../../components/block-comps/Form"
import Input from "../../components/block-comps/Inputs"

const landingPageLogin = ({handleRegister}) => {

  
  return (
    <div className="container-right" >
    <Form
      onSubmit={() => ("")}
      className="signIn-form"
      btnText="Log In"
      btnClass="form-btn"
      onClick= {()=>handleRegister()}
      signup="createAcct-btn"
    >
      <Input
        className="signIn-input"
        type="email"
        name="signIn"
        placeholder="Email or Phone Number"
        required={true}
      />
      <Input
        className="signIn-input"
        type="password"
        name="password"
        placeholder="Password"
        required={true}
      />
    </Form>

   

  </div>
  )
}



export default landingPageLogin