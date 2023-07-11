import React from 'react'
import './UpdateProfile.scss'
function UpdateProfile() {
  return (
    <div className="update-profile">
        <div className="container">
            <div className="left-part">
                <img className='user-img' src="" alt="" />
            </div>
            <div className="right-part">
                <form >
                    <input type="text" placeholder='Your name' />
                    <input type="text" placeholder='Your Bio'/>
                    <input type="submit" className='btn-primary' value="Submit" />
                </form>
                <button className='delete-account btn-primary'>Delete account</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile