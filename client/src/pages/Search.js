import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useHistory } from 'react-router-dom';
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as CalendarIcon } from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as UsersIcon } from "feather-icons/dist/icons/users.svg";
import { StyledDiv } from "../utils/AnimationRevealPage.js";
import Header from "../components/headers/light.js";

export default function Search(){

  const [destination, setDestination] = useState("");
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
    adults: 1,
    children: 0,
    babies: 0,
    rooms: 1,
  });

  const history = useHistory();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    history.push("/hotels", { state: { destination, date, options } });
  };

  return (
    <StyledDiv className="App">
        <Header />
        <div className="headerSearch">
          <div className="headerSearchItem">
            <LocationIcon />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <CalendarIcon />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
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
          <div className="headerSearchItem">
            <UsersIcon />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adults} adults · ${options.children} children · ${options.babies} babies · ${options.rooms} rooms`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adults</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adults <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adults", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.adults}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adults", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Babies</span>
                  <div className="optionCounter">
                  <button
                      disabled={options.babies <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("babies", "d")}
                  >
                      -
                  </button>
                  <span className="optionCounterNumber">
                      {options.babies}
                  </span>
                  <button
                      className="optionCounterButton"
                      onClick={() => handleOption("babies", "i")}
                  >
                      +
                  </button>
                  </div>
              </div>
                <div className="optionItem">
                  <span className="optionText">Rooms</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.rooms <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("rooms", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.rooms}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("rooms", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
    </StyledDiv>
  )
}