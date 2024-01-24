import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa6'; //fa6/FaSistrix
import css from './Searchbar.module.css';

export const Searchbar = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const handlechange = ({ target: { value } }) => setValue(value);
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.loupe}>
            <FaSistrix /> {/* fa6/FaSistrix */}
          </span>
        </button>
        <input
          onChange={handlechange}
          type="text"
          autoComplete="off"
          autoFocus
          name="value"
          value={value}
          placeholder="Search images and photos"
          className={css.input}
        />
      </form>
    </header>
  );
};

