import { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ title, icon, children, className = '', onClick }: CardProps) => {
  return (
    <div 
      className={`card p-6 h-full flex flex-col ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className="mb-4 text-secondary">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
      <div className="mt-auto">
        {children}
      </div>
    </div>
  );
};

export default Card;