const Loading = () => {
    return <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-3" role="status">
            <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-danger m-3" role="status">
            <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-warning m-3" role="status">
            <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-success m-3" role="status">
            <span className="sr-only"></span>
        </div>
    </div>
}
 
export default Loading;