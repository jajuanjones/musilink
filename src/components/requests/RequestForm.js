import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

// we need to make sure the member selected from our members array is being tracked
export const RequestForm = () => {
    const [request, updateRequest] = useState({
        description: "",
        deadline: ""
    })

    const {memberId} = useParams()
    const history = useHistory()
    // variable to assign our current logged in user
    const musiLinkUser = localStorage.getItem("musilink_user")

    // create a function that posts our new request into our requests array in json
    const createNewRequest = (event) => {
        event.preventDefault()
        const newRequest = {
            userId: parseInt(musiLinkUser),
            memberId: parseInt(memberId),
            description: request.description,
            deadline: request.deadline
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }
        debugger
        return fetch("http://localhost:8088/requests", fetchOption)
            .then(() => history.push("/userRequests"))
    }


    return(
        <>
            <h2 className="requestForm__title">New Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a description..."
                        onChange={(event) => {
                            const copy = {...request}
                            copy.description = event.target.value
                            updateRequest(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Deadline:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Enter your deadline..."
                        onChange={(event) => {
                            const copy = {...request}
                            copy.deadline = event.target.value
                            updateRequest(copy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={(event)=>createNewRequest(event)}>
                Create Request
            </button>
        </>
    )
}
