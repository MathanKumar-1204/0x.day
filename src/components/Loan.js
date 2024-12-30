import React, { useState, useEffect } from "react";
import "./Loan.css";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Loan = () => {
  const [form, setForm] = useState({
    name: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
    documentVerified: false,
    guarantor: "",
    bankInterest: "",
    verificationFiles: null,
  });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser)
              setIsLoggedIn(true)
            } else {
                 setUser(null);
                setIsLoggedIn(false)
            }
        });
    return () => unsubscribe();
    }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleFileUpload = (e) => {
    setForm({ ...form, verificationFiles: e.target.files });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
        if(!isLoggedIn){
         alert("Please log in before submitting a loan request.")
          return;
        }
    try {
      if (!user) {
        alert("User not logged in. Please log in to submit the loan application.");
        return;
      }
      const userDocRef = doc(db, "admin", user.uid);
      await updateDoc(userDocRef, {
        loanAmount: form.loanAmount,
        tenure: form.tenure,
        purpose: form.purpose,
        guarantor: form.guarantor,
      });

      if (form.verificationFiles) {
           const uploadedFiles = Array.from(form.verificationFiles).map(
            (file) => file.name
          );
          console.log("Uploaded Files:", uploadedFiles);
        }
      alert("Loan Application Submitted!");
      console.log(form);
    } catch (error) {
      console.error("Error submitting loan application:", error);
      alert("Failed to submit the loan application.");
    }
  };

  return (
    <div className="loan-page">
      <h1 className="loan-header">Apply for a Loan</h1>
      <form className="loan-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Loan Amount (₹):
          <input
            type="number"
            name="loanAmount"
            value={form.loanAmount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tenure (in years):
          <input
            type="number"
            name="tenure"
            value={form.tenure}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Purpose of Loan:
          <textarea
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        {/* <label>
          Verification of Documents (Upload Files):
          <input
            type="file"
            name="verificationFiles"
            multiple
            onChange={handleFileUpload}
            required
          />
        </label> */}
        <label>
          Guarantor Details:
          <input
            type="text"
            name="guarantor"
            value={form.guarantor}
            onChange={handleChange}
            placeholder="Name of Guarantor"
          />
        </label>
        <label>
          {/* Bank Interest Rate (%):
          <input
            type="number"
            name="bankInterest"
            value={form.bankInterest}
            onChange={handleChange}
            placeholder="e.g., 7.5"
          /> */}
        </label>
        <button type="submit">Submit Application</button>
      </form>
      <div className="loan-summary">
        <h2>Loan Details Summary</h2>
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Loan Amount:</strong> ₹{form.loanAmount}</p>
        <p><strong>Tenure:</strong> {form.tenure} years</p>
        <p><strong>Purpose:</strong> {form.purpose}</p>
        <p><strong>Guarantor:</strong> {form.guarantor || "Not Provided"}</p>
        {/* <p>
          <strong>Uploaded Files:</strong>{" "}
          {form.verificationFiles
            ? Array.from(form.verificationFiles).map((file) => file.name).join(", ")
            : "No Files Uploaded"}
        </p> */}
      </div>
    </div>
  );
};



export default Loan;