import axios from 'axios';
import { useEffect, useState } from 'react';

const useCategories = (filter) => {
	const [allCategories, setAllCategories] = useState([]);
	const [categoriesItems, setCategoriesItems] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await axios('https://api.publicapis.org/categories');
			setAllCategories(res.data);
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		setCategoriesItems(
			allCategories.filter((item) => {
				return item.toUpperCase().indexOf(filter) > -1;
			})
		);
	}, [filter, allCategories]);

	return categoriesItems;
};

function App() {
	const [filter, setFilter] = useState('');
	const categoriesItems = useCategories(filter);

	const handleChangeFilter = (e) => {
		setFilter(e.target.value.toUpperCase());
	};

	return (
		<>
			<input className="input" type="text" placeholder="filter" onChange={handleChangeFilter}></input>
			<table className="table">
				<tbody>
					<tr>
						<th>Categories</th>
					</tr>
					{categoriesItems.map((item) => (
						<tr key={item}>
							<td>{item}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default App;
