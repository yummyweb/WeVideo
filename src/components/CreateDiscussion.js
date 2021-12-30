import React, { useState } from "react"
import { useStateContext } from "../contexts/StateContextProvider"
import "./CreateDiscussion.css"

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const CreateDiscussion = () => {
    const { uploadVideo, contract, loading } = useStateContext()

    const [video, setVideo] = useState(null)
    const [title, setTitle] = useState("")
    const [issue, setIssue] = useState("")
    const [duration, setDuration] = useState(0)
    const [_loading, _setLoading] = useState(false)

    const captureFile = e => {
        const file = e.target.files[0]
        window.URL = window.URL || window.webkitURL
        const videoEl = document.createElement('video')
        videoEl.preload = 'metadata'
        videoEl.onloadedmetadata = function () {
            window.URL.revokeObjectURL(videoEl.src)
            console.log(videoEl.duration)
            setDuration(videoEl.duration)
        }
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend = () => {
            setVideo(Buffer(reader.result))
        }
    }

    const _uploadVideo = () => {
        if (video && title !== "" && issue !== "" && duration < 60) {
            _setLoading(true)
            ipfs.add(video)
            .then(res => {
                uploadVideo(res.path, title, issue)
                .then(() => {
                    _setLoading(false)
                    alert("New discussion created successfully!")
                })
            })
        }
        else {
            if (duration > 60) {
                alert("Video duration should not be more than a minute.")
            }
            else {
                alert("Title or issue should not be empty.")
            }
        }
    }

    const submit = () => {
        _uploadVideo()
    }

    return (
        <div className="discussion-form">
            <div className="discussion-row">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" className="video-title" />
                <input value={issue} onChange={e => setIssue(e.target.value)} placeholder="Enter issue" className="video-title" />
            </div>
            <br />
            <input onChange={e => captureFile(e)} accept=".mp4, .ogg, .mkv, .wmv" id="upload" type="file" />
            <button onClick={submit} className="video-upload">{ _loading ? "Loading..." : "Create discussion" }</button>
        </div>
    )
}

export default CreateDiscussion