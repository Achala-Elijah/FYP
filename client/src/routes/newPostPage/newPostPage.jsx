import "./newPostPage.scss";
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include Quill styles
import apiRequest from "../../lib/apiRequest";


function NewPostPage() {
  const [value, setValue] = useState('');
  const [err, setErr] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate()





  const handleFiles = (e) => {
      setFiles([...e.target.files])
  }


  const handleImageUpload = async () => {
    const formData = new FormData()
    files.map((file) => {
      formData.append("postImage", file)
    })
    const res = await apiRequest.post("/uploads/post", formData)
    const postsUrl = res.data
    setImages(postsUrl)
    return postsUrl
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const inputs = Object.fromEntries(formData)
    console.log(inputs)

    try{
      const uploadedImages = await handleImageUpload()
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: 0, //parseInt(inputs.bedroom),
          bathroom: 0,//parseInt(inputs.bathroom),
          type: "buy",//inputs.type,
          property: "land",//inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: uploadedImages,
        },
        postDetail: {
          desc: value,
          utilities: "tenant",//inputs.utilities,
          pet: "not-allowed",//inputs.pet,
          income: "No income policy",//inputs.income,
          size: parseInt(inputs.size),
          school: 0,//parseInt(inputs.school),
          bus: 0,//parseInt(inputs.bus),
          restaurant: 0,//parseInt(inputs.restaurant),

        }
      })
      navigate("/" + res.data.id)

    }catch(e){
      console.log(e)
      setErr(err)
    }
  }


  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>

              <ReactQuill theme="snow" value={value} onChange={setValue} />

            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            {/*<div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
  </div>*/}
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
           {/* <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>*/}
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            {/*<div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>*/}
            <button className="sendButton">Add</button>
            {err && <span>{err}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {
          files.map((file, idx) => <div key={idx} style={{width: "100px", height: "100px"}} >
            <img style={{width: "100%", height: "100%"}} src={URL.createObjectURL(file)}/>
          </div>)
        }
        <input type="file" multiple onChange={handleFiles}/>
      </div>
    </div>
  );
}

export default NewPostPage;
