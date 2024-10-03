import React from 'react'
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div>
            <div class="image-container">
                <img src="../imgfolder/clinic.jpg" alt="Image" />
                <div class="labels">
                    <div style={{ height: "30px" }}></div>
                    <Link to="/Profile" className="label uppercase font-bold underline">
                        Register Now
                    </Link>

                    <div style={{ height: "30px" }}></div>
                    <Link to="/Profile" className="label upeercase font-bold  underline">Inquiry Requests</Link>
                </div>
            </div>


        </div>
    )
}
export default Home;