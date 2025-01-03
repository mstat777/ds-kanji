import './Card.scss';

type CardProps = {
   type: string;
   className?: string | undefined;
   text: string;
   onClick: () => void;
}

export default function Card(props: CardProps) {
   const { type, className, text, onClick } = props;

   return (
      <button
         className={`${type} ${className ? className : ''}`}
         onClick={onClick}
      >
         <p className="text">{text}</p>
      </button>
   )
}