import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/contactSlice';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleChange = (e) => {
    // Установка фильтра
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>
        Filter contacts by name:
        <input type="text" value={filter} onChange={handleChange} />
      </label>
    </div>
  );
}

export default Filter;
