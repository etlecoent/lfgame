import React, { useState, useEffect, useCallback } from "react";

import useDebounce from "../../hooks/useDebounce";

const SearchBar = (props) => {
  const [value, setValue] = useState("");
  const term = useDebounce(value, 400);

  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <form className="search__form" onSubmit={event => event.preventDefault()}>
      <input
        spellCheck="false"
        placeholder="Search Game"
        name="search"
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </form>
  );
}

export default SearchBar;