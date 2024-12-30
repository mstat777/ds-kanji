import "./MainBtn.scss";
import { forwardRef, Ref } from "react";

type ButtonProps = {
   type?: "submit" | "reset" | "button" | undefined;
   text: string;
   onClick: () => void;
}

const MainBtn = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
   const { type, text, onClick } = props;

   return (
      <button
         ref={ref}
         type={type ? type : "button"}
         onClick={onClick}
         className="main_btn">
         {text}
      </button>
   );
});

export default MainBtn;