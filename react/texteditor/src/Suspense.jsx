
import "./Suspense.css";

const SuspenseLoader = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};

export default SuspenseLoader;