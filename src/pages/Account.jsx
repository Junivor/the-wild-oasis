import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm.jsx";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm.jsx";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm />
        {/*<p>Update user data form</p>*/}
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        {/*<p>Update user password form</p>*/}
      </Row>
    </>
  );
}

export default Account;
