import { useSelector, useDispatch } from 'react-redux';
import { selectFilterQuery, setFilter } from '../../redux/filterSlice';
import style from './Filter.module.css';
import { setFilteredContacts } from 'redux/contactsSlice';
import { useEffect } from 'react';

const Filter = () => {
  const filter = useSelector(selectFilterQuery);
  const dispatch = useDispatch();

  const handleFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };
  useEffect(() => {
    dispatch(setFilteredContacts(filter));
  }, [dispatch, filter]);
  return (
    <>
      <label className={style.label}>
        Find contacts by name
        <input
          className={style.input}
          type="text"
          name="filter"
          placeholder="Enter name"
          value={filter}
          onChange={handleFilter}
        />
      </label>
    </>
  );
};

export default Filter;
