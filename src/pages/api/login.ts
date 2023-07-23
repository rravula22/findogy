import { useDispatch } from 'react-redux'
import { loginSuccess } from "../../../store/reducers/cookieSlice"


export default async function loginHandler(
    email: string, name: string
) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      
      if (!response.ok) {
        return { error: response.statusText, status: response.status }
      }
      
      if(response.headers.get('Set-Cookie')) {
        useDispatch()({ type: loginSuccess.type, payload: response.headers.get('Set-Cookie') || '' })
      }
      return {
        status: response.status,
        error: null,
      }
}
