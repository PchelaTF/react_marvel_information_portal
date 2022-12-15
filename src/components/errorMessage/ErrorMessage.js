import img from './error.gif'

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="" />
        <img
            src={img}
            alt="error_image"
            style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} />
    )
}

export default ErrorMessage