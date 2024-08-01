import { useNavigate } from "react-router-dom";
import cn from "../../utils/cn";

function BackButton({ className }) {
  const navigate = useNavigate();
  return (
    <button
      className={cn(
        "aspect-square rounded-full p-4 text-3xl transition-all hover:bg-gray-200",
        className,
      )}
      onClick={() => navigate(-1, { replace: true })}
    >
      🔙
    </button>
  );
}
export default BackButton;
