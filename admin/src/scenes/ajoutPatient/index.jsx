import React, { useState } from "react";
import "./addProfile.css"; // Import your CSS file here
import axios from "axios";

const AddProfile = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    sexe: "male",
    email: "",
    mot_de_passe: "",
    image: "",
    date_de_naissance: "",
    numeroDeTelphone: "",
    role: "medcin", // Default role
  });

  const [file, setFile] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the formData to your backend or perform any desired action here
    axios
      .post(`http://localhost:3000/${formData.role}/addOne`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(formData);
  };
  const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "travelMind");
    await axios
      .post("https://api.cloudinary.com/v1_1/do25iiz1j/upload", form)
      .then((res) => setFormData({ ...formData, image: res.data.secure_url }))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <h4>Nom</h4>
          <div className="input-group input-group-icon">
            <input
              type="text"
              placeholder="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="styled-input"
            />
            <div className="input-icon">
              <i className="fa fa-user" />
            </div>
          </div>
          {/* Other account-related fields */}
        </div>
        <div className="row">
          <h4>Prenom</h4>
          <div className="input-group input-group-icon">
            <input
              type="text"
              placeholder="Prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="styled-input"
            />
            <div className="input-icon">
              <i className="fa fa-user" />
            </div>
          </div>
          {/* Other account-related fields */}
        </div>
        <div className="row">
          <div className="col-half">
            <h4>Gender</h4>
            <div className="input-group">
              <input
                id="gender-male"
                type="radio"
                name="sexe"
                value="male"
                checked={formData.sexe === "male"}
                onChange={handleChange}
                className="styled-radio"
              />
              <label htmlFor="gender-male">Male</label>
              <input
                id="gender-female"
                type="radio"
                name="sexe"
                value="female"
                checked={formData.sexe === "female"}
                onChange={handleChange}
                className="styled-radio"
              />
              <label htmlFor="gender-female">Female</label>
              {/* Other gender options */}
            </div>
          </div>
        </div>
        <div className="row">
          <h4>Email</h4>
          <div className="input-group input-group-icon">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="styled-input"
            />
            <div className="input-icon">
              <i className="fa fa-envelope" />
            </div>
          </div>
          {/* Other email-related fields */}
        </div>
        <div className="row">
          <h4>Password</h4>
          <div className="input-group input-group-icon">
            <input
              type="password"
              placeholder="Password"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              className="styled-input"
            />
            <div className="input-icon">
              <i className="fa fa-key" />
            </div>
          </div>
          {/* Other password-related fields */}
        </div>

        <div className="row">
          <h4>Image</h4>
          {formData.image ? (
            <img src={formData.image} style={{ width: "150px" }} />
          ) : (
            <>
              <input
                className="image-input"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                className="addImage"
                onClick={() => {
                  uploadImage();
                }}
              >
                Upload Image
              </button>
            </>
          )}
          {/* Other image-related fields */}
        </div>
        <div className="row">
          <h4>date de naissance</h4>
          <div className="input-group input-group-icon">
            <input
              type="date"
              name="date_de_naissance"
              value={formData.date_de_naissance}
              onChange={handleChange}
              className="styled-input"
            />
            <div className="input-icon">
              <i className="fa fa-calendar" />
            </div>
          </div>
          {/* Other date of birth-related fields */}
        </div>
        <div className="row">
          <h4>numero De Telphone</h4>
          <div className="input-group input-group-icon">
            <input
              type="number"
              placeholder="numero De Telphone"
              name="numeroDeTelphone"
              value={formData.numeroDeTelphone}
              onChange={handleChange}
              className="styled-input"
            />
            <div className="input-icon">
              <i className="fa fa-phone" />
            </div>
          </div>
          {/* Other phone number-related fields */}
        </div>
        <div className="row">
          <h4>Role</h4>
          <div className="input-group input-group-icon">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="styled-input"
            >
              <option value="medcin">Medcin</option>
              <option value="pharmacien">Pharmacien</option>
            </select>
            <div className="input-icon">
              <i className="fa fa-user-md" />
            </div>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="addImage">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;
