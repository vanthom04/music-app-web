import { useContext } from 'react'
import Context from './Context'

export const useMusic = () => {
  const [state, dispatch] = useContext(Context)
  return [state, dispatch]
}
