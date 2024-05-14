import Image from "next/image";
import deleteIcon from "../../icons/deleteIcon.svg";

function DeleteProductButton(row, onDelete) {
  const handleClick = () => {
    onDelete(row.id);
  };
  return (
    <>
      <div>
        <button onClick={handleClick}>
          <Image src={deleteIcon} alt="deleteIcon" />
        </button>
      </div>
    </>
  );
}
export default DeleteProductButton;
