import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { useDispatch } from "react-redux";
import { editActive, removeTransactions } from "../features/transiction/transactionSlice";

export default function Transaction({ transaction }) {
    const { id, name, amount, type } = transaction || {};
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(editActive(transaction));
    }
    const handleDelete = () => {
        dispatch(removeTransactions(id));
        // window.location.reload();
    }

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link" onClick={handleEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link"
                    onClick={handleDelete}
                >
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
