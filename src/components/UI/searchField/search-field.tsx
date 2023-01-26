import { useState, useRef, useEffect } from "react";
import classes from "./search-field.module.scss"
import { ReactComponent as SearchIcon } from "../../../assets/images/Search.svg";
import { ReactComponent as CancelIcon } from "../../../assets/images/Cancel.svg";
import { IconButton } from "@mui/material";


const SearchField = (props : any) => {

    const [searchButtonVisible, setSearchButtonVisible] = useState(true);
    let cancelButtonElement = document.getElementById("cancel");
    let searchButtonElement = document.getElementById("searchField");
    let searchFormElement = document.getElementById("searchForm");
    const searchInputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      cancelButtonElement = document.getElementById("cancel");
      searchButtonElement = document.getElementById("searchField");
      searchFormElement = document.getElementById("searchForm");
      cancelButtonElement!.style.display = "none";
      searchFormElement!.style.display = "none";
    }, []);
  
    const cancelButtonClickedHandler = () => {
      setSearchButtonVisible(true);
      setTimeout(() => {
          cancelButtonElement!.style.display = "none";
          searchButtonElement!.style.display = "block";
          searchFormElement!.style.display = "none";
      },400 )
    
    
    };
  
    const searchButtonClickedHandler = () => {
      searchButtonElement!.style.display = "none";
      cancelButtonElement!.style.display = "flex";
      searchFormElement!.style.display = "block";
      setSearchButtonVisible(false);
    };

    return (
        <section className={classes.search_field}>
              <IconButton
            aria-label="close search"
            color="primary"
            className={`${classes.icon_btn} ${classes.cancelIcon}`}
            id="cancel"
            onClick={cancelButtonClickedHandler}
          >
            <CancelIcon className={classes.cancelIcon} />
          </IconButton>
          <form
        className={`${classes.search_form} ${
          searchButtonVisible ? classes.hide : classes.show
        }`}
        id="searchForm"
      >
        <label htmlFor="search"></label>
        <input
          type="text"
          ref={searchInputRef}
          className={classes.searchInput}
        />
        <SearchIcon className={classes.searchInput_icon} />
      </form>
      <IconButton
            aria-label="search"
            color="primary"
            className={`${classes.icon_btn} `}
            onClick={searchButtonClickedHandler}
            id="searchField"
          >
            <SearchIcon />
          </IconButton>
        </section>
    
    )
}

export default SearchField;