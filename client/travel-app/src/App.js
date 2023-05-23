import "./App.css";
import * as React from "react";
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import Register from "./Components/Regiter/Register";
import Login from "./Components/Login/Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import { Zoom } from '@mui/material';

const pinAddSuccess = () =>{
  toast.success("Added a splash ")
}

const userNotLoggedIn = () =>{
  toast.warning("Login to account to set pins ")
}

const userLoggedOut = (userS) =>{
  toast.warning("logout from " + userS)
}
const pinAddFailure = () =>{
  toast.error(" you can't add pin! ")
}

function App() {
  const [pins, setPins] = React.useState([]);

  const [viewPort, setViewPort] = React.useState({
    longitude: 12.4,
    latitude: 37.8,
    Zoom: 14,
  });

  const [currentPlaceId, setcurrentPlaceId] = React.useState(null);

  const [newPlace, setNewPlace] = React.useState(null);

  const [title, setTitle] = React.useState(null);
  const [descr, setDescr] = React.useState(null);

  const [currentUser, setcurrentUser] = React.useState(null);

  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const [rating, setRating] = React.useState(1);

  const handleAddClick = (e) => {
    console.log(e);

    let lat = e.lngLat.lat;
    let lon = e.lngLat.lng;

    setNewPlace({
      lat: lat,
      lng: lon,
    });
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      userName: currentUser,
      title: title,
      rating: rating,
      descr: descr,
      lat: newPlace.lat,
      lon: newPlace.lng,
    };

    try {
      if (!currentUser) {

        userNotLoggedIn()

      } else {
        const responce = await axios.post("/pins", newPin);
        setPins([...pins, responce.data]);
        setNewPlace(null);

        pinAddSuccess() 

        setRating(1);
        setDescr(null);
        setTitle(null);
      }
    } catch (err) {

      pinAddFailure()

      console.log(err);
    }
  };

  const handleMarketClicked = (id, lat, lon) => {
    setcurrentPlaceId(id);
  };

  const handleLogout = () => {
    userLoggedOut(currentUser)
    setcurrentUser(null);
  };

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const responce = await axios.get("/pins"); // to get pins
        setPins(responce.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div>
      <Map
        container={"map"}
        projection={"globe"}
        initialViewState={{ viewPort }}
        mapboxAccessToken={process.env.REACT_APP_KEY}
        style={{ width: "100vw", height: "100vh" }}
        // mapStyle= "mapbox://styles/issameljaouhari/cli0b2d7x001y01qy20c86gwo"

        mapStyle="mapbox://styles/issameljaouhari/clhunzjb2023c01qu3yhfbo8j"
        //  mapStyle= "mapbox://styles/issameljaouhari/clhupdhso024r01pnfmnyewor"  //(to change the style-colors-render of map)
        onDblClick={handleAddClick}
      >
        <ToastContainer position="top-left" theme="dark" />
        {/* so you can control the whole map by zoom in and out  */}
        <NavigationControl />
        {pins.map((p) => (
          <>
            <Marker longitude={p.lon} latitude={p.lat} anchor="center">
              <LocationOnIcon
                className="icon"
                onClick={() => handleMarketClicked(p._id, p.lat, p.lon)}
                style={{
                  fontSize: viewPort.Zoom * 2,
                  color: p.userName === currentUser ? "DB005B" : "1B9C85",
                }} //if we have a current user , make it a different  color
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.lon}
                latitude={p.lat}
                closeOnClick={false}
                closeOnMove={false}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Riview</label>
                  <p className="descr"> {p.descr}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Informations</label>
                  <span className="username">
                    {" "}
                    Made by<b>{p.userName}</b>
                  </span>
                  <span className="date"> {format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick={false}
            closeOnMove={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handlePinSubmit}>
                <label>Title</label>
                <input
                  placeholder="Make it titled 💬..."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say something about it 📍..."
                  onChange={(e) => setDescr(e.target.value)}
                />

                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <button className="submitButton" type="submit">
                  left your splash 🎨...
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>

      <div className="footer">
        <div className="footer_down">
          {currentUser ? (
            <button className="button logout" onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <div>
              <button
                className="button login"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Sign in 👤
              </button>

              <button
                className="button register"
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                Sign Up 🖊️
              </button>
            </div>
          )}
        </div>
        {showRegister && <Register setShowRegister={setShowRegister} />}

        {showLogin && (
          <Login setShowLogin={setShowLogin} setCurrentUser={setcurrentUser} />
        )}
      </div>
    </div>
  );
}

export default App;
