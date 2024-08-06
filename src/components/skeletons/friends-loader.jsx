import { Spinner } from "@nextui-org/spinner";
function FriendsLoader() {
  return (
    <div className="mt-14 flex w-full place-content-center">
      <Spinner
        classNames={{
          circle1: "border-b-blue-600",
          circle2: "border-b-blue-600",
        }}
      />
    </div>
  );
}
export default FriendsLoader;
