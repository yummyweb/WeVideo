import React, { useEffect, useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import "./Stats.css"
import { useStateContext } from "../contexts/StateContextProvider"
import { useWeb3Context } from "../contexts/Web3ContextProvider"
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import Header from "../components/Header"
import SideItem from "../components/SideItem"
import SidebarContainer from "../components/SidebarContainer"
import { useNavigate } from "react-router-dom"

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
}

const Stats = () => {
  const { getVideos, setVideos, videos, nft, readOnlyContract, loading } = useStateContext()
  const { address } = useWeb3Context()
  const [currentSection, setCurrentSection] = useState(3)
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!loading) {
      const _data = {
        labels: videos.filter(v => v.author === address).map(v => v.title),
        datasets: [
          {
            label: 'Likes',
            data: videos.filter(v => v.author === address).map(v => parseInt(v.likes._hex, 16)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      }
      setData(_data)
    }
  }, [videos])

  useEffect(async () => {
    if (readOnlyContract && !loading) {
        await getVideos()
    }
  }, [readOnlyContract])

    const mint = async video => {
      const baseUri = "https://ipfs.infura.io/ipfs/"
      const metadata = {
        name: video.title,
        description: video.issue,
        image: baseUri + video.hash
      }
      const addedMetadata = await ipfs.add(JSON.stringify(metadata))
      nft.mint(address, baseUri + addedMetadata.path)
      .then(() => {
        alert("Successfully minted NFT")
      })
    }

    return (
      <SimpleBar style={{ height: "100vh", width: "100vw" }} forceVisible="y" autoHide={false}>
        <Header />
        <div className="account">
          <SidebarContainer>
              <SideItem active={currentSection === 0} text="For you" onclick={() => { window.location.replace("/#/account") }} />
              <SideItem active={currentSection === 1} text="Following" onclick={() => setCurrentSection(1)} />
              <SideItem active={currentSection === 2} text="Create" onclick={() => setCurrentSection(2)} />
              <SideItem active={currentSection === 3} text="Stats" onclick={() => { setCurrentSection(3)}} />
              <SideItem active={currentSection === 4} text="Profile" onclick={() => setCurrentSection(4)} />
          </SidebarContainer>
          <div classname="stats">
            <div className="stats-graph">
                {data ? <Bar options={options} data={data} /> : null}
            </div>
            <h2 style={{ marginTop: 50 }}>Mint NFT from Video</h2>
            <div className="mint-nft">
              {loading && <p>Loading...</p>}
              {[...new Set(videos)].map(video => (
                <div key={video.id}>
                  {video.author === address ? <div className="video-nft">
                    <p>{ video.title }</p>
                    <button onClick={() => {
                      if (video.likes >= 5) {
                        mint(video)
                      }
                    }} className={`mint-btn ${video.likes < 5 ? "disabled" : null}`}>Mint NFT</button>
                  </div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SimpleBar>
    )
}

export default Stats