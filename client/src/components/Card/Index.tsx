import './Card.scss';

type CardProps = {
   text: string;
   onClick: () => void;
}

export default function Card({ text, onClick }: CardProps) {

   return (
      <button
         className="card"
         onClick={onClick}
      >
         <p className="text">{text}</p>
      </button>
   )
}