
import React, { useEffect, useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import api from './api/Api';


const Profile = () => {

  const [Name, setname] = useState('')
  const [dob, setDob] = useState('')
  const [phoneNo, setPhoneno] = useState('')
  const [door_street, setDoorstreet] = useState('')
  const [door_streeterror, setDoorstreeterror] = useState(false)
  const [city, setCity] = useState('')
  const[cityerror,setcityerror]=useState(false)
  const [pincode, setPincode] = useState('')
  const[pincodeerror,setpincodeerror]=useState(false)
  const [panNo, setPanno] = useState('')
  const [Email, setEmail] = useState('')
  const [state, setState] = useState('')
  const[stateerror,setstateerror]=useState(false)
  const [customerId, setCustomerid] = useState('')
  

 

  useEffect(() => {
    const cusid = localStorage.getItem('cid')
    console.log("CustomerId:", cusid)
    setCustomerid(cusid)
    getprofile(cusid);

  }, [])


  const handledoorstreet= (event) => {
    console.log("pass", event.target.value)
    setDoorstreet(event.target.value);
    if (event.target.value !== "") {
      setDoorstreeterror('');
    }
  }

  const handlecity= (event) => {
    console.log("pass", event.target.value)
    setCity(event.target.value);
    if (event.target.value !== "") {
      setcityerror('');
    }
  }

  const handlestate = (event) => {
    console.log("pass", event.target.value)
    setState(event.target.value);
    if (event.target.value !== "") {
      setstateerror('');
    }
  }

  const handlepincode = (event) => {
    console.log("pass", event.target.value)
    setPincode(event.target.value);
    if (event.target.value !== "") {
      setpincodeerror('');
    }
  }

  

  const navigate = useNavigate();

  const Backhandle = () => {
    navigate('/CustomerServiceMenu');
  }
  const handlelogout = () => {

    navigate('/', { replace: true });
  };

  const getprofile = async (customerId) => {
    await api.get(`getdetails/${customerId}`)
      .then(response => {
        console.log('display all customer details', response.data);
        setname(response.data.Name)
        setDob(response.data.Dob)
        setCity(response.data.City)
        setDoorstreet(response.data.DoorStreet)
        setEmail(response.data.Email)
        setPhoneno(response.data.PhoneNo)
        setPincode(response.data.Pincode)
        setState(response.data.State)
        setPanno(response.data.PanNo)
      })
      .catch(error => {
        console.log("Something went wrong", error);
      })
  }
  


  const profileupdate = async () => {
    if (door_street === '') {
      setDoorstreeterror('Enter the door and street');
      return;
    } else if (state === '') {
      setstateerror('Enter the state');
      return;
    } else if (city === '') {
      setcityerror('Enter the city');
      return;
    } else if (pincode === '') {
      setpincodeerror('Enter the pincode');
      return;
    } else if (pincode.length !== 6) {
      setpincodeerror('Pincode should contain exactly 6 characters');
      return;
    }
  

    var updateObj = {
      id: customerId,
      pincode: pincode,
      city: city,
      doorStreet: door_street,
      state: state
    }
    console.log("sbgfjgsdkj", updateObj);
    try {
    

if(door_street && pincode && city && state){
     await api.post(`/update`, updateObj)
        .then(response => {
          console.log("Data saved", response.data);
          alert("Data updated successfully")
          navigate('/CustomerServiceMenu');
        })

    }
  

}catch (error) {
      console.log("sorry data not updated", error);
      console.log(customerId);
      console.log(door_street);
      console.log(city);
      console.log(pincode);
      
    }
  }
  return (
    <div className="body1">
    
    <div className="Profile">
    <button className='profilelogout' type="button" onClick={handlelogout}>Logout</button>
    <h1 className='h1profil'>My Profile Details</h1>
    
    <div className='f1'>
  <label className='lab'>Name</label>
  <input className='profilinput' type='text' name='name' value={Name} onChange={(e) => setname(e.target.value)} readOnly />
  
  <label className='lab'>DOB</label>
  <input className='profilinput' type='text' name='date' value={dob} onChange={(e) => setDob(e.target.value)} readOnly />
  
  <label className='lab'>Phone Number</label>
  <input className='profilinput' type='text' name='phone' value={phoneNo} onChange={(e) => setPhoneno(e.target.value)} readOnly />
  
  <label className='lab'>Pan No</label>
  <input className='profilinput' type='text' name='panno' value={panNo} onChange={(e) => setPanno(e.target.value)} readOnly/>  
  
  <label className='lab'>Email</label>
  <input className='profilinput' type="text" value={Email} onChange={(e) => setEmail(e.target.value)} readOnly/>
  
    <label className='lab'>Door & Street<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"white" }} className='profilinput'  type='text' name='street' value={door_street} onChange={handledoorstreet} />
    <span style={{ color: "red", display: "block"}}>{door_streeterror}</span>
    
    <label className='lab'>City<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"white" }}  className='profilinput' type='text' name='city' value={city} onChange={handlecity}/>
    <span style={{ color: "red", display: "block"}}>{cityerror}</span>
    
    <label className='lab'>State<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"white" }}  className='profilinput' type='text' name='state' value={state} onChange={handlestate}/>
    <span style={{ color: "red", display: "block" }}>{stateerror}</span>
    
    <label className='lab'>Pincode<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"white" }}  className='profilinput' type='text' name='pincode'  value={pincode} onChange={handlepincode}/>
    <span style={{ color: "red", display: "block" }}>{pincodeerror}</span>
    </div>
    <button className='btnprofil' type="button" onClick={profileupdate}>Submit</button>
    <button className='btnn1profil' type="button" onClick={Backhandle}>Back</button>
    </div>
    </div>
  )
}

export default Profile;


