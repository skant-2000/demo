import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPost } from "../Redux/actions";

export const NewOrder = () => {
  // Get data of only this user. store it in redux
  // GET /orders?owner_name=john will give you all order of user john
  //  on submit click create a new order, new order has status `Not Accepted`

  const [usersPost, setUsersPost] = useState(null)

  const { currentUser } = useSelector(store => store)
  const { authenticUserPost } = useSelector(store => store)
  const dispatch = useDispatch()

  useEffect(() => {
    setUsersPost(authenticUserPost)
  }, [authenticUserPost])

  const [form, setForm] = useState({problem: "", owner_name: currentUser[0].username, brand: ""})

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlePost = () => {
    fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "problem": form.problem,
              "owner_name": form.owner_namew,
              "brand": form.brand,
              "status": "Not Accepted",
            })
        })
        .then(() => {dispatch(fetchUserPost(currentUser[0].username))})
  }

  useEffect(() => {
    dispatch(fetchUserPost(currentUser[0].username))
}, [])

  return (
    <div>
      <div className="form">
        <input
          className="new-problem"
          type="text"
          name="problem"
          placeholder="Enter problem"
          onChange={handleFormChange}
        />
        {/* This input is readonly, it's coming from redux */}
        <input
          className="owner-name"
          type="text"
          name="owner_name"
          placeholder="yourname"
          value={form.owner_name}
          readOnly
        />
        <input
          className="brand"
          type="text"
          name="brand"
          placeholder="Enter brand name"
          onChange={handleFormChange}
        />
        {/* Create new problem, show it in below form immediately */}
        <button className="submit" onClick={handlePost}>submit</button>
      </div>

      <div className="pastOrders">
        {/* this button filters the data below. */}
        {/* it's just a toggle of redux state something like `showUnfinished`  */}
        <button className="filter">
          {/* Text should change like:   Show {showUnfinished ? "all" : "Only unfinished"} */}
          Show Only unfinished
        </button>

        {/* Here create a div for every oreder, filter them before based on `showUnfinished` */}
        {usersPost ? (
          usersPost.map(item => (
            <div className="past-orders">
              <span className="id">{item.id}</span>. <span className="problem">{item.problem}</span>{" "}
              {item.cost ? (
                <span className="cost">
                {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
                {item.cost}
              </span>
              ) : null}
              <p className="status">Status: {item.status}</p>
              <hr />
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};
