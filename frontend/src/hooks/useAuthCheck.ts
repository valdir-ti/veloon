import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthCheck = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('authToken')

		if (!token) {
			navigate('/login')
		} else {
			const payload = JSON.parse(atob(token.split('.')[1]))
			const exp = payload.exp * 1000
			if (Date.now() >= exp) {
				localStorage.removeItem('token')
				navigate('/login')
			}
		}
	}, [navigate])
}
