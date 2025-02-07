import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { GOOGLE_ACCESS_TOKEN } from './token'

function GoogleRedirectHandler() {
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("Redirect handler")
        const queryParams = new URLSearchParams(window.location.search)
        const accessToken = queryParams.get('access_token')
        console.log("queryparams", window.location.search)

        if(accessToken){
            console.log("A.Token found", accessToken)
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken)

            // verify token from backend
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            axios.get('http://127.0.0.1:8000/api/auth/user/').then(response =>{
                console.log('User data', response.data)
                navigate('/dashboard/')
            }).catch(error =>{
                console.error("error verify token", error.response? error.response.data: error.message)
                navigate('/login')
            })
        }else{
            console.log("no token found")
            navigate('/login')
        }
    }, [navigate])
    
    return <div>Logging in .....</div>
 
}

export default GoogleRedirectHandler
