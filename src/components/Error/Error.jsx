import { selectError } from 'redux/contactsSlice';
const Error = () => {
  return (
    <div>
      <p>Something went wrong. Please try again</p>
      <p>Error message : {selectError}</p>
    </div>
  );
};

export default Error;
