import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
    return (
      <div className='m-2 flex items-center justify-center'>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="cyan"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
};

export default Loader;