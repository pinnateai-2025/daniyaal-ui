import "./StayInLoop.css";

const StayInLoop = () => {
    return (
        <section className="stayinloop-section">
            <div className="stayinloop-title">
                <h2>Stay in the Loop</h2>
                <p>
                    Be the first to discover new fragrances, exclusive offers, and perfumery
                    <br /> insights. Join our community of fragrance enthusiasts.
                </p>
            </div>
            <div className="stayinloop-contact">
                <input type="text" placeholder="Enter your email" />
                <button>Subscribe</button>
            </div>
        </section>
    )
}

export default StayInLoop;