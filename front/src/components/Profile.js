import React, { useState, useEffect } from "react";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import QRCode from "react-qr-code";
import axios from "axios";
import "./Profile.css";

const QRCodeGenerator = () => {
  const [qrText, setQRText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/auth/signin');
        console.log(result);
        setQRText(result.data.qrValue);
      } catch (error) {
        console.error('Error fetching QR data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <QRCode value={qrText} />
    </div>
  );
};

const Profile = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="invalid-feedback d-block">
          This is not a valid email.
        </div>
      );
    }
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeOTP = (e) => {
    const otp = e.target.value;
    setOTP(otp);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/auth/verify', { email, otp });
      setVerificationResult(result.data.message); // Set the verification result
      alert(result.data.message);
    } catch (error) {
      console.error('Error verifying:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setVerificationResult(error.response.data.error); // Set the specific error message from API
        alert(error.response.data.error); // Show the specific error message in an alert
      } else {
        setVerificationResult("Error during verification");
        alert("Error during verification");
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="verify">
        <h1>Verification</h1>
        <Form onSubmit={handleVerification}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <Input
              type="text"
              className="form-control"
              name="otp"
              value={otp}
              onChange={onChangeOTP}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block">
              <span>Verify</span>
            </button>
          </div>

          {verificationResult && (
            <div className="verification-result">
              {/* Display verification result */}
              {verificationResult}
            </div>
          )}

          <CheckButton style={{ display: "none" }} />
        </Form>
      </div>

      <div style={{ height: "auto", margin: "0 auto", maxWidth: "100%", width: "100%" }}>
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default Profile;
