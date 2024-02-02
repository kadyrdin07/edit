import axios from "axios";
import { useEffect, useState } from "react";
import css from "./Style.module.css";
const url =
	"https://elchocrud.pro/api/v1/6c90a8f6405c541a517760539c5d3cef/todoo";

const Axios = () => {
	const [state, setState] = useState([]);
	const [title, setTitle] = useState("");
	const [image, steImage] = useState("");
	const [description, setDesctiption] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const [editId, setEditId] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editImage, setEditImage] = useState("");
	const [editDescription, setEditDescription] = useState("");

	console.log(state);

	const handleAdd = async () => {
		const newData = {
			title: title,
			image: image,
			description: description,
		};
		const response = await axios.post(url, newData);
		setState(response.data);
	};

	const getRequest = async () => {
		const response = await axios.get(url);
		setState(response.data);
	};
	useEffect(() => {
		getRequest();
	}, []);

	const deleteRequest = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setState(response.data);
	};
	const deleteAll = async () => {
		const response = await axios.delete(url);
		setState(response.data);
	};
	const updateTodo = async () => {
		const updatedData = {
			title: editTitle,
			image: editImage,
			description: editDescription,
		};
		const response = await axios.put(`${url}/${editId}`, updatedData);
		console.log(response.data);
		getRequest();
		setIsEdit(false);
	};

	const updateTodoValue = (id) => {
		const editedTodo = state.find((item) => item._id === id);
		setEditTitle(editedTodo.title);
		setEditImage(editedTodo.image);
		setDesctiption(editedTodo.description);
		setEditId(id);
		setIsEdit(!false);
		setTitle("");
		steImage("");
		setEditDescription("");
	};

	return (
		<div>
			<div className={css.container}>
				<input
					type="text"
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
				/>
				<input
					type="text"
					value={image}
					onChange={(e) => steImage(e.target.value)}
				/>
				<input
					type="text"
					value={description}
					onChange={(e) => setDesctiption(e.target.value)}
				/>
				<div className={css.button}>
					<button onClick={handleAdd}>add</button>
					<button onClick={() => deleteAll()}>deletAll</button>
				</div>
			</div>

			<div className={css.content}>
				{state.map((item) => (
					<div className={css.div1} key={item._id}>
						<h1 className={css.h1}>{item.title}</h1>
						{isEdit && editId === item._id ? (
							<>
								<input
									className={css.input1}
									type="text"
									placeholder="new title"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<input
									className={css.input2}
									type="text"
									placeholder="new image"
									value={editImage}
									onChange={(e) => setEditImage(e.target.value)}
								/>
								<input
									className={css.input3}
									type="text"
									placeholder="new description"
									value={editDescription}
									onChange={(e) => setEditDescription(e.target.value)}
								/>
								<button onClick={() => updateTodo(item._id)}>Save</button>
							</>
						) : (
							<>
								<div>
									<div className={css.module}>
										<h3 className={css.h3}>{item.title}</h3>
										<img src={item.image} alt={item.title} />
										<p>{item.description}</p>
									</div>
								</div>
							</>
						)}
						<img src={item.image} alt={item.title} />
						<p>{item.description}</p>
						<button onClick={() => deleteRequest(item._id)}>DELETE</button>
						<button onClick={() => updateTodoValue(item._id)}>EDIT</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Axios;
