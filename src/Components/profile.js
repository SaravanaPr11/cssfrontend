
import React, { useEffect, useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import api from './api/Api';


const Profile = () => {

  const [Name, setname] = useState(' ')
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
  const [customerId, setCustomerid] = useState(' ')
  

 

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
  const handlelogout= () => {
    navigate('/');
  }
  const getprofile = async (customerId) => {
     await api.get(`getdetails/${customerId}`)
      .then(response => {
        console.log('display all customer details', response.data);
        setname(response.data.Name)
        setDob(response.data.dob)
        setCity(response.data.city)
        setDoorstreet(response.data.door_street)
        setEmail(response.data.Email)
        setPhoneno(response.data.phoneNo)
        setPincode(response.data.pincode)
        setState(response.data.state)
        setPanno(response.data.panNo)


      })
      .catch(error => {
        console.log("something problem", error);
      })
  }



const profileupdate = async () => {
if(door_street === ''){
  setDoorstreeterror('enter the door and street');
  return;
}
else if(state === ''){
  setstateerror('enter the state');
  return;
}
else if(city === '' ){
  setcityerror('enter the city');
  return;
}
else if(pincode === ''){
  setpincodeerror('enter the pincode');
  return;
}


    var updateObj = {
      customerId: customerId,
      name: Name,
      pincode: pincode,
      city: city,
      dob: dob,
      doorStreet: door_street,
      panNo: panNo,
      state: state,
      phoneNo: phoneNo,
      email: Email
    }
    console.log("sbgfjgsdkj", updateObj);
    try {
    

if(door_street && pincode && city && state){
     await api.post(`updatecustomer`, updateObj)
        .then(response => {
          console.log("Data saved", response.data);
          alert("Data updated successfully")
        })

    }
  

}catch (error) {
      console.log("sorry data not updated", error);
    }
  }
  return (
    <div className="body1">
    
    <div className="Profile">
    <button className='profilelogout' type="button" onClick={handlelogout}>Logout</button>
    <h1 className='h1profil'>My Profile Details</h1>
    
    <div className='f1'>
  <label className='lab'>Name:</label>
  <input className='profilinput' type='text' name='name' value={Name} onChange={(e) => setname(e.target.value)} />
  <br /><br />
  <label className='lab'>DOB:</label>
  <input className='profilinput' type='text' name='date' value={dob} onChange={(e) => setDob(e.target.value)} />
  <br /><br />
  <label className='lab'>Phone Number:</label>
  <input className='profilinput' type='text' name='phone' value={phoneNo} onChange={(e) => setPhoneno(e.target.value)} />
  <br /><br />
  <label className='lab'>Pan No:</label>
  <input className='profilinput' type='text' name='panno' value={panNo} onChange={(e) => setPanno(e.target.value)} />  
  <br /><br />
  <label className='lab'>Email:</label>
  <input className='profilinput' type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
    <label className='lab'>Door & Street:<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"#edd1bc" }} className='profilinput'  type='text' name='street' value={door_street} onChange={handledoorstreet} />
    <span style={{ color: "red" }}>{door_streeterror}</span>
    <br /><br />
    <label className='lab'>City:<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"#edd1bc" }}  className='profilinput' type='text' name='city' value={city} onChange={handlecity}/>
    <span style={{ color: "red" }}>{cityerror}</span>
    <br /><br />
    <label className='lab'>State:<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"#edd1bc" }}  className='profilinput' type='text' name='state' value={state} onChange={handlestate}/>
    <span style={{ color: "red" }}>{stateerror}</span>
    <br /><br />
    <label className='lab'>Pincode:<span style={{ color: 'red' }}>*</span></label>
    <input style={{ backgroundColor:"#edd1bc" }}  className='profilinput' type='text' name='pincode'  value={pincode} onChange={handlepincode}/>
    <span style={{ color: "red" }}>{pincodeerror}</span>
    </div>
    <button className='btnprofil' type="button" onClick={profileupdate}>Submit</button>
    <button className='btnn1profil' type="button" onClick={Backhandle}>Back</button>
    </div>
    </div>
  )
}

export default Profile;


