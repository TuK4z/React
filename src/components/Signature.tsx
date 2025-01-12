import Logo from '../assets/brands/lsrg/logo.svg';

const Signature = () => {
  return (
    <div className="absolute left-8 top-8">
        <div className="flex items-center">
            <img className='h-14' src={Logo} alt="logo" />
        </div>
    </div>
  );
};

export default Signature;