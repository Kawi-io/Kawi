import { useState } from 'react'

const MyPage: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const handleButtonClick = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <>
            <h1>My Page</h1>
            <button onClick={handleButtonClick}>Load Data</button>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>


        </>
    )
}

export default MyPage