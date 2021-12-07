import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!emailRef.current.value) return setError("");

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for further instructions!");
    } catch (err) {
      console.log(err);
      setMessage("");
      setError(
        "Password reset failed. Are you sure your email address is correct?\n" +
          err
      );
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Your Password?</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control className="mb-3" type="email" ref={emailRef} />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="warning">{message}</Alert>}
            <Button dissable={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Want to create an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
