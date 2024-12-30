import './Card.scss';

type CardProps = {
   className?: string | undefined;
   text: string;
   onClick: () => void;
}

export default function Card(props: CardProps) {
   const { className, text, onClick } = props;

   return (
      <button
         className={`card ${className ? className : ''}`}
         onClick={onClick}
      >
         <p className="text">{text}</p>
      </button>
   )
}