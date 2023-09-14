import { ColorRing } from 'react-loader-spinner';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <ColorRing
        visible={true}
        height="150"
        width="150"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#283a22', '#6f4785', '#bc7fbb', '#e0c9bb', '#688c4f']}
      />
    </div>
  );
};

export default Loader;
