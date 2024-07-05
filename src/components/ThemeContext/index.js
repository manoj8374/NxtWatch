import {createContext, useState, useEffect} from 'react'

const ThemeContext = createContext('Dark')
const SavedVideos = createContext([])
const LikedVideos = createContext([])
const DislikedVideos = createContext([])

const ThemeProvider = ({children}) => {
  const [savedVideos, setSavedVideos] = useState([])
  const [likedVideos, setLikedVideos] = useState([])
  const [dislikedVideos, setDisLikedVideos] = useState([])
  const [theme, setTheme] = useState('Light')

  const toggleTheme = () => {
    setTheme(previousTheme => (previousTheme === 'Light' ? 'Dark' : 'Light'))
  }

  const saveTheVideo = videoDetails => {
    const isPresent = savedVideos.some(
      eachItem => eachItem.id === videoDetails.id,
    )
    if (!isPresent) {
      setSavedVideos(prevVideos => [...prevVideos, videoDetails])
    } else {
      const filteredArr = savedVideos.filter(
        eachItem => eachItem.id !== videoDetails.id,
      )
      setSavedVideos(filteredArr)
      console.log('Video Already Added')
    }
  }

  const AddToLikeVideo = id => {
    if (dislikedVideos.includes(id)) {
      const filteredArr = dislikedVideos.filter(eachId => eachId !== id)
      setDisLikedVideos(filteredArr)
    }
    if (!likedVideos.includes(id)) {
      setLikedVideos(prevState => [...prevState, id])
    }
  }

  const AddToDislikeVideo = id => {
    if (likedVideos.includes(id)) {
      const filteredArr = likedVideos.filter(eachId => eachId !== id)
      setLikedVideos(filteredArr)
    }
    if (!dislikedVideos.includes(id)) {
      setDisLikedVideos(prevState => [...prevState, id])
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        saveTheVideo,
        savedVideos,
        AddToLikeVideo,
        likedVideos,
        AddToDislikeVideo,
        dislikedVideos,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}
