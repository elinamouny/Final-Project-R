import React from 'react'
import notFoundImg from '../../Assets/images/error.svg'

function NotFound() {
    return (
        <div>
            <img className='w-50 m-auto d-block py-5' src={notFoundImg} alt="" />
        </div>
    )
}

export default NotFound