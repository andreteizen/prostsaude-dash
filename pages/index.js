import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
      // Always do navigations after the first render
      router.push('/nf')
    }, [])
  
  }
