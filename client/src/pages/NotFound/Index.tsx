import './NotFound.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {

   return (
      <main className="not_found">
         <h1>error 404: page not found</h1>
         <p>This page is not available. Return to <Link to="/home">home</Link></p>
      </main>
   );
}