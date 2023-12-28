import Form from "../../components/block-comps/Form"
import Input from "../../components/block-comps/Inputs"

const LandingPage = (props) => {
  return (
    <div className="landingPage-container">
      <div className="container-left" >
        <h1>Company Name</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, sed! Doloremque quos accusamus maiores sint illum, ea corrupti voluptatem. Dolorem omnis at similique voluptas a eveniet, iste reprehenderit consectetur molestias?</p>
      </div>
      <div className="container-right" >
        <Form
          onSubmit={() => ("")}
          className="signIn-form"
          btnText="Log In"
          btnClass="form-btn"
        >
          <Input
            className="signIn-input"
            type="email"
            name="signIn"
            placeholder="Email or Phone Number"
          />
          <Input
            className="signIn-input"
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form>
    
      </div>
    </div>
  )
}

export default LandingPage