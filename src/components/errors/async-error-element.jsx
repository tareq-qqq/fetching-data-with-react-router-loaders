import { useAsyncError } from "react-router-dom";
import ErrorElement from "./error-element";

function AsyncErrorElement() {
  const error = useAsyncError();
  console.log(error);
  return <ErrorElement error={error} />;
}
export default AsyncErrorElement;
