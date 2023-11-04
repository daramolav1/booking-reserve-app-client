import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faLandmark,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "header-container list-mode" : "header-container"
        }
      >
        <div className="header-list">
          <div className="header-list-item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="header-list-item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight</span>
          </div>

          <div className="header-list-item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>

          <div className="header-list-item">
            <FontAwesomeIcon icon={faLandmark} />
            <span>Attractions</span>
          </div>

          <div className="header-list-item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="header-title">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="header-desc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free account
            </p>
            <button className="header-btn">Sign in/Register</button>
            <div className="header-search">
              <div className="header-search-item">
                <FontAwesomeIcon icon={faBed} className="header-icon" />
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Where are you going?"
                />
              </div>

              <div className="header-search-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header-icon"
                />
                <span
                  className="header-search-text"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="header-search-item">
                <FontAwesomeIcon icon={faPerson} className="header-icon" />
                <span
                  className="header-search-text"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adults • ${options.children} children • ${options.room} rooms`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="option-item">
                      <span className="option-text">Adult</span>
                      <div className="option-container">
                        <button
                          disabled={options.adult <= 1}
                          className="option-btn"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="option-number">{`${options.adult}`}</span>
                        <button
                          className="option-btn"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="option-item">
                      <span className="option-text">Children</span>
                      <div className="option-container">
                        <button
                          disabled={options.children <= 0}
                          className="option-btn"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="option-number">{`${options.children}`}</span>
                        <button
                          className="option-btn"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="option-item">
                      <span className="option-text">Rooms</span>
                      <div className="option-container">
                        <button
                          disabled={options.room <= 1}
                          className="option-btn"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="option-number">{`${options.room}`}</span>
                        <button
                          className="option-btn"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="header-search-item">
                <button className="header-btn">Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
