import React, { useEffect, useState } from "react"
import { ReactVideoPlayer } from 'video-player-for-react'
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { AiOutlineRetweet } from "react-icons/ai"
import './video-player.css'
import "./Feed.css"
import { useStateContext } from "../contexts/StateContextProvider"

const Feed = () => {
    const { getVideos, loading, videos, contract, readOnlyContract, uploadVideo } = useStateContext()
    const [liked, setLiked] = useState(false)
    const [retweet, setRetweet] = useState(localStorage.getItem("retweet"))
    const [_videos, _setVideos] = useState([])

    useEffect(() => {
        if (!loading) {
            videos.forEach(v => {
                _setVideos(prev => new Set([...prev, {
                    id: v.id,
                    hash: v.hash,
                    title: v.title,
                    issue: v.issue,
                    likes: parseInt(v.likes._hex, 16),
                    author: v.author
                }]))
            })
        }
    }, [videos])

    useEffect(async () => {
        if (readOnlyContract && !loading) {
            await getVideos()
        }
    }, [readOnlyContract])

    return (
        <div class="feed">
            {videos.length !== 0 ? videos.map((video, i) => (
                <>
                    {video.issue !== "" ? (
                        <div className="feed-video">
                            <ReactVideoPlayer width='600px' url={`https://ipfs.infura.io/ipfs/${video.hash}`} />
                            <p className="discussion-issue">{ video.title }</p>
                            <div className="video-actions">
                                <div className="video-like">
                                    {!liked ? (
                                        <FcLikePlaceholder className="like-icon" size={30} onClick={() => {
                                            setLiked(prev => !prev)
                                            contract.likeVideo(video.id, video.likes)
                                            .then(() => {
                                                _setVideos(prev => {
                                                    const toReturn = [...prev, {
                                                        id: video.id,
                                                        hash: video.hash,
                                                        title: video.title,
                                                        issue: video.issue,
                                                        author: video.author,
                                                        likes: parseInt(video.likes._hex, 16) + 1
                                                    }]

                                                    return [...new Set(toReturn)]
                                                })
                                                setTimeout(() => window.location.reload(), 2000)
                                            })
                                        }} />
                                    ) : (
                                        <FcLike className="like-icon" size={30} onClick={() => {
                                            setLiked(prev => !prev)
                                        }} />
                                    )}
                                    <p>{ _videos.length === videos.length ? _videos[i].likes : parseInt(video.likes._hex, 16) }</p>
                                </div>
                                <div className="video-like">
                                    <AiOutlineRetweet color={retweet ? "green" : null} className="like-icon" size={30} onClick={() => {
                                        setRetweet(prev => !prev)
                                        localStorage.setItem("retweeted", retweet)
                                        uploadVideo(video.hash, video.title, video.issue)
                                        .then(() => {
                                            window.location.reload()
                                        })
                                    }} />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </>
            )) : (!loading ? <h2 className="feed-error">No videos found!</h2> : <h2 className="feed-error">Loading...</h2>)}
        </div>
    )
}

export default Feed