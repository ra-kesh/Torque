
import React from 'react'
import {Link} from 'react-router-dom'

export const NavBar = () => {
    return (
        <header>
            <div className="container">
                <div className="flex-row">
                    <div className="flex-col-lg-2">
                        <div className="nav-brand container">
                            <h3>VISOR</h3>
                        </div>
                    </div>
                    <div className="flex-col-lg-8 flex align-center  ">
                        <nav>
                            <Link to='/'>
                               <li className='nav-link'>Home</li>
                            </Link>
                            <Link to='/videos'>
                                <li className='nav-link'>Videos</li>
                            </Link>

                        </nav>
                    </div>
                    <div className="flex-col-lg-3">

                    </div>
                </div>
            </div>
        </header>
    )
}
