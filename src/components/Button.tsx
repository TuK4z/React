interface ButtonProps {
  onClick: () => void;
  btnText: string;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ onClick, btnText, className = '', disabled = false, size = 'medium' }) => {
  const sizeClass = size === 'small' ? 'w-24 h-8 text-sm' : size === 'large' ? 'w-48 h-16 text-xl' : 'w-32 h-12 text-base';

  return (
      <button
          onClick={onClick}
          className={`rounded-lg ${sizeClass} text-white font-medium text-sm ${className} bg-contentbackground hover:bg-contentbackgroundhover`}
          disabled={disabled}
      >
          <div className="flex justify-center items-center">
              <span>{btnText}</span>
          </div>
      </button>
  );
};

export default Button;
